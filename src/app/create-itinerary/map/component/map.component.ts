import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { MapService } from '../service/map.service';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @Input() places: any;
  @Input() userLocation: any;

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;

  constructor(private mapService: MapService) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  createMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [ this.userLocation.longitude, this.userLocation.latitude ],
      zoom: 15
    });
    const mapPlaces = this.translatePlaces(this.places, this.userLocation)
    this.printRoute(mapPlaces);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.addPlacesToMap(mapPlaces);
  }

  translatePlaces(places, userLocation) {
    return [
      userLocation,
      ...Object.values(places).map(({ place }) => place)
    ]
  }

  addPlacesToMap(places) {
    places.slice(1).forEach(place => {
      const myMarker = new mapboxgl.Marker({ color: '#7862DA' })
        .setLngLat([place.longitude, place.latitude])
        .addTo(this.map);

      myMarker.getElement().addEventListener('mouseenter', function(){
        myMarker.getElement().style.cursor = 'pointer';
        myMarker.setPopup(this.makePopup(place));
      }.bind(this));

      myMarker.getElement().addEventListener('mouseleave', function(){
        this.map.getCanvas().style.cursor = '';
        myMarker.getPopup().remove();
      }.bind(this));

      myMarker.getElement().addEventListener('click', this.flyToPoint.bind(this, place));
    });
  }

  printRoute(places) {
    const { lng, lat } = this.map.getCenter();
    let userPoint = turf.featureCollection([ turf.point([ lng, lat ])]);
    let dropoffs: any = turf.featureCollection([]);
    let nothing: any = turf.featureCollection([]);
    let coordinates = [];
    let distributions = [];

    places.forEach((place, index) => {
      const coordinate = [place.longitude, place.latitude];
      var pt = turf.point(
        coordinate,
        {
          orderTime: Date.now(),
          key: Math.random()
        }
      );
      dropoffs.features.push(pt);
      coordinates.push(coordinate);
      distributions.push([1, index + 2]);
    })

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'warehouse',
        type: 'circle',
        source: {
          data: userPoint,
          type: 'geojson'
        },
        paint: {
          'circle-radius': 7,
          'circle-color': '#3887be',
          'circle-stroke-color': 'white',
          'circle-stroke-width': 3
        }
      });

      this.map.addSource('route', {
        type: 'geojson',
        data: nothing
      });

      this.map.addLayer({
        id: 'routeline-active',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': [
            "interpolate",
            ["linear"],
            ["zoom"],
            12, 3,
            22, 12
          ]
        }
      });

      this.map.addLayer({
        id: 'routearrows',
        type: 'symbol',
        source: 'route',
        layout: {
          'symbol-placement': 'line',
          'text-field': '▶',
          'text-size': [
            "interpolate",
            ["linear"],
            ["zoom"],
            5, 10,
            10, 25
          ],
          'symbol-spacing': [
            "interpolate",
            ["linear"],
            ["zoom"],
            2, 7,
            5, 35
          ],
          'text-keep-upright': false
        },
        paint: {
          'text-color': '#3887be',
          'text-halo-color': 'hsl(55, 11%, 96%)',
          'text-halo-width': 3
        }
      });

      this.map.addLayer({
        id: 'dropoffs-symbol',
        type: 'symbol',
        source: {
          data: {
            type: 'FeatureCollection',
            features: []
          },
          type: 'geojson'
        },
        layout: {
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': 'marker-15',
        }
      });


      const source: mapboxgl.GeoJSONSource = this.map.getSource('dropoffs-symbol') as mapboxgl.GeoJSONSource;

      source.setData(dropoffs);

      this.mapService.getOptimizedRoute(coordinates, mapboxgl.accessToken).subscribe(
        (data: any) => {
          let routeGeoJSON: any = turf.featureCollection([turf.feature(data.routes[0].geometry)]);

          if (!data.routes[0]) {
            routeGeoJSON = nothing;
          } else {

            const routeSource: mapboxgl.GeoJSONSource = this.map.getSource('route') as mapboxgl.GeoJSONSource;
            routeSource.setData(routeGeoJSON);
          }

        }, (error: any) => {
          console.error('ERROR: ', error);
        });

    });

  }

  makePopup(place) {
    return new mapboxgl.Popup({ closeButton: false, closeOnClick: true, offset: 25})
      .setLngLat([place.longitude, place.latitude])
      .setHTML(`<strong>${place.title}</strong>`)
      .addTo(this.map);
  }

  flyToPoint(place) {
    this.map.flyTo({
      center: [ place.longitude, place.latitude ],
      zoom: 18
    });
  }

  ngOnInit(): void {
    this.createMap();
  }

}

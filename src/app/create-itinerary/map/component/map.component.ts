import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { MapService } from '../service/map.service';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';
import { Place } from 'src/app/shared/models/place';

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
      center: [ this.places[0].longitude, this.places[0].latitude ],
      zoom: 15
    });

    this.printRoute(this.places);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.addMarkers(this.places);
  }


  addMarkers(places: Place[]) {
    places.slice(1).forEach((place: { longitude: number; latitude: number; }) => {
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

  printRoute(places: Place[]) {
    const { lng, lat } = this.map.getCenter();
    let userPoint = turf.featureCollection([ turf.point([ lng, lat ])]);
    let dropoffs: any = turf.featureCollection([]);
    let nothing: any = turf.featureCollection([]);
    let coordinates = [];

    places.forEach((place: { longitude: any; latitude: any; }) => {
      const coordinate = [place.longitude, place.latitude];
      var pt = turf.point(coordinate);

      dropoffs.features.push(pt);
      coordinates.push(coordinate);
    })

    this.map.on('load', () => {
      this.addUserPoint(userPoint);

      this.map.addSource('route', {
        type: 'geojson',
        data: nothing
      });

      this.addRouteLayers();
      this.getOptimizedRoute(coordinates, nothing);
    });
  }

  getOptimizedRoute(coordinates: any[], nothing: any) {
    this.mapService.getOptimizedRoute(coordinates).subscribe(
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
  }

  addUserPoint(userPoint: turf.FeatureCollection<turf.Point, { [name: string]: any; }>) {
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
  }

  addRouteLayers() {
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
  }

  makePopup(place: Place) {
    return new mapboxgl.Popup({ closeButton: false, closeOnClick: true, offset: 25})
      .setLngLat([place.longitude, place.latitude])
      .setHTML(`<strong>${place.title}</strong>`)
      .addTo(this.map);
  }

  flyToPoint(place: Place) {
    this.map.flyTo({
      center: [ place.longitude, place.latitude ],
      zoom: 18
    });
  }

  ngOnInit(): void {
    this.createMap();
  }

}

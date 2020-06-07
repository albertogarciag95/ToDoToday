import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../../environments/environment';

import { MapService } from '../service/map.service';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent {

  @Input() userLocation: any;
  @Output() sendRoute = new EventEmitter<number>();
  private _places: any;
  _id: string;

  @Input() set places(places: any) {

      if(JSON.stringify(places) !== JSON.stringify(this._places)) {
        this._places = places;
        this.createMap();
      }
  }

  @Input() set id(id: string) {

    this._id = id;
    this.changeDetector.detectChanges();
  }

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;

  constructor(private mapService: MapService, private changeDetector: ChangeDetectorRef) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  createMap() {
    this.map = new mapboxgl.Map({
      container: this._id,
      style: this.style,
      center: [ this._places[0].longitude, this._places[0].latitude ],
      zoom: 15
    });

    this.printRoute(this._places);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
    this.addMarkers(this._places);
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
    const userPoint = turf.featureCollection([ turf.point([ lng, lat ])]);
    const dropoffs: any = turf.featureCollection([]);
    const nothing: any = turf.featureCollection([]);
    const coordinates = [];

    places.forEach((place: { longitude: any; latitude: any; }) => {
      const coordinate = [place.longitude, place.latitude];
      const pt = turf.point(coordinate);

      dropoffs.features.push(pt);
      coordinates.push(coordinate);
    });

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
          this.sendRoute.emit(Number((data.routes[0].distance / 1000).toFixed(2)));
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
          'interpolate',
          ['linear'],
          ['zoom'],
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
          'interpolate',
          ['linear'],
          ['zoom'],
          5, 10,
          10, 25
        ],
        'symbol-spacing': [
          'interpolate',
          ['linear'],
          ['zoom'],
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

  // ngOnDestroy(): void {
  //   this.map.removeLayer('routearrows');
  //   this.map.removeLayer('routeline-active');
  //   this.map.removeLayer('warehouse');
  //   this.map.removeSource('route');
  //   this.map = null;
  // }

  // ngOnInit(): void {
  //   this.createMap();
  // }

}

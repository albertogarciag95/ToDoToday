import { Component, OnInit, Input } from '@angular/core';

import { Place } from 'src/app/shared/models/place';
import { environment } from '../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  @Input() places: Place[];
  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 40.421487;
  lng = -3.707879;
  zoom = 13;

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  createMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [-3.707884, 40.421528],
      zoom: 12,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.addPlaces(this.places);
  }

  addPlaces(places) {
    places.forEach(place => {
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

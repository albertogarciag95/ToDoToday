import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';

@Injectable({ providedIn: 'any' })

export class MapService {

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 40.428814;
  lng = -3.702118;
  zoom = 15;

  constructor() {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap(places) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    places.forEach(place => {
      new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .addTo(this.map);
    });
  }
}

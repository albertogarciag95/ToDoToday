import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-select-dialog',
  templateUrl: './map-select-dialog.html',
  styleUrls: ['./map-select-dialog.css']
})

export class MapSelectDialog implements OnInit {

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;

  isElementSelected: boolean = false;

  constructor(public dialogRef: MatDialogRef<MapSelectDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  createMap() {
    const { userLocation } = this.data;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: userLocation,
      zoom: 15
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      const userPoint = turf.featureCollection([ turf.point(userLocation)]);
      this.addUserPoint(userPoint);
      this.addClickEventHandler();
    });
  }

  addClickEventHandler() {
    let currentMarker: any;
    this.map.getCanvas().style.cursor = 'pointer';

    this.map.on('click', (element) => {
      currentMarker && currentMarker.remove();

      const pointSelected: any = [element.lngLat.lng, element.lngLat.lat]
      currentMarker = new mapboxgl.Marker({ color: '#7862DA' })
        .setLngLat(pointSelected)
        .addTo(this.map);

      this.isElementSelected = true;
      this.data.selected = pointSelected;
      this.flyToPoint(pointSelected, this.map.getZoom());
    });
  }

  flyToPoint(place: any, zoom: number) {
    this.map.flyTo({
      center: place,
      zoom
    });
  }

  addUserPoint(userPoint) {
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

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.createMap();
  }

}

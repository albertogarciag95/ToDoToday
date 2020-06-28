import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapService } from '../../../../results/components/map/service/map.service';

@Component({
  selector: 'app-map-select-dialog',
  templateUrl: './map-select-dialog.html',
  styleUrls: ['./map-select-dialog.css']
})

export class MapSelectDialog implements OnInit {

  mapbox = mapboxgl as typeof mapboxgl;
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;

  isElementSelected = false;
  okPressed = false;
  text = '';

  constructor(public dialogRef: MatDialogRef<MapSelectDialog>, public service: MapService, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.addMapControls(userLocation);

    this.map.on('load', () => {
      const userPoint = turf.featureCollection([ turf.point(userLocation)]);
      this.addUserPoint(userPoint);
      this.addClickEventHandler();
    });
  }

  addMapControls(userLocation) {
    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'p. ej. Plaza de Callao',
      proximity: { longitude: userLocation[0], latitude: userLocation[1] },
      filter: this._filterResultsByRegion.bind(this),
      marker: { color: '#7862DA' },
      mapboxgl
    }).on('result', ({ result }) => {
      const { geometry: { coordinates }, place_name} = result;
      this.isElementSelected = true;
      this.data = { selected: coordinates, location: place_name };
      this.text = place_name;
    }));

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  _filterResultsByRegion(item) {
    return item.context.map(itemCtx => (itemCtx.id.split('.').shift() === 'region' && itemCtx.text === 'Madrid'))
      .reduce((acc, cur) => acc || cur);
  }

  addClickEventHandler() {
    let currentMarker: any;
    this.map.getCanvas().style.cursor = 'pointer';

    this.map.on('click', (element) => {
      if (currentMarker) {
        currentMarker.remove();
      }

      const pointSelected: any = [element.lngLat.lng, element.lngLat.lat];
      currentMarker = new mapboxgl.Marker({ color: '#7862DA' })
        .setLngLat(pointSelected)
        .addTo(this.map);

      this.isElementSelected = true;
      this.getPlaceName(pointSelected);
    });
  }

  getPlaceName(pointSelected) {
    this.service.getGeocoding(pointSelected).subscribe(
      response => {
        this.data = { selected: pointSelected, location: response.features[0].place_name };
        this.flyToPoint(pointSelected, this.map.getZoom());
      });
  }

  flyToPoint(place: any, zoom: number) {
    this.map.flyTo({ center: place, zoom });
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

  closePassingLocation() {
    this.okPressed = true;
    if (this.isElementSelected) {
      this.dialogRef.close(this.data);
    }
  }

  ngOnInit(): void {
    this.createMap();
  }

}

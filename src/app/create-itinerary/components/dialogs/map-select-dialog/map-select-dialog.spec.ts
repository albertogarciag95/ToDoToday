import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectDialog } from './map-select-dialog';
import { MapService } from '../../../../results/components/map/service/map.service';
import { MatDialogRef, MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';

import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';

describe('MapSelectDialog', () => {
  let component: MapSelectDialog;
  let fixture: ComponentFixture<MapSelectDialog>;
  let control: any;

  const mapbox = mapboxgl as typeof mapboxgl;
  mapbox.accessToken = environment.mapBoxToken;

  const response: any = { features: [ {placeName: 'test'}]};
  const dialogRefSpyObj = jasmine.createSpyObj({ close: () => {}});

  const spy = jasmine.createSpyObj('MapService', ['getGeocoding']);
  spy.getGeocoding.and.returnValue( of(response) );

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectDialog ],
      imports: [ MatDialogModule ],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MapService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectDialog);
    component = fixture.componentInstance;
    component.style = `mapbox://styles/mapbox/streets-v11`;

    component.data = { userLocation: [-3, 30] };
    component.map = new mapboxgl.Map({
      container: 'map',
      style: component.style,
      center: [-3, 30],
      zoom: 15
    });
    control = component.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'p. ej. Plaza de Callao',
      proximity: { longitude: -3, latitude: 30 },
      filter: results => results,
      marker: { color: '#7862DA' },
      mapboxgl
    }));

    fixture.detectChanges();
  });

  it('should create', (done: DoneFn) => {
    component.map.on('load', () => {
      done();
      expect(component).toBeTruthy();
    });
  });

  it('map geocoder control keypress', (done: DoneFn) => {
    component.map.on('load', () => {
      component.addMapControls([-3, 30]);
      done();
      expect(component).toBeTruthy();
    });
  });

  it('map geocoder control', (done: DoneFn) => {
    component.map.on('load', () => {
      const pointSelected: any = [-3, 30];
      component.map.fire('click', {lngLat: {lng: -3, lat: 30 }});

      component.addClickEventHandler();
      component.map.on('click', (element: any) => {
        expect(component.isElementSelected).toBeTrue();
      });
      done();
    });
  });

  it('map closes', (done: DoneFn) => {
    component.close();
    done();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  });

  it('map closes passing location', () => {
    component.isElementSelected = true;
    component.closePassingLocation();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  });

  it('filter results by region', () => {
    component.isElementSelected = true;
    component._filterResultsByRegion({ context: [{ id: 'region.test' , text: 'Madrid'}, { id: 'city.test' , text: 'test'}] });
  });

});

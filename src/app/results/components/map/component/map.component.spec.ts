import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { Place } from 'src/app/shared/models/place';
import { environment } from '../../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';

import { MapService } from '../service/map.service';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let myMarker: mapboxgl.Marker;
  let fakeResponse: any;
  const mapbox = mapboxgl as typeof mapboxgl;
  mapbox.accessToken = environment.mapBoxToken;

  const map = new mapboxgl.Map({
    container: document.createElement('div'),
    style: `mapbox://styles/mapbox/streets-v11`,
    center: [-3.707884, 40.421528],
    zoom: 15,
  });

  const fakeCoordinates: any[] = [[-3.70351, 40.416988], [-3.69346, 40.411128]];

  beforeEach(async(() => {
    fakeResponse = { data: { routes: []}};
    const spy = jasmine.createSpyObj('MapService', ['getOptimizedRoute']);
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['getForeign']);
    spy.getOptimizedRoute.and.returnValue( of(fakeResponse) );
    httpServiceSpy.getForeign.and.returnValue( of(fakeResponse) );

    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: MapService, useValue: spy },
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.map = map;
    component._places = [
      { latitude: 40.416988, longitude: -3.70351 },
      {
        title: 'test',
        description: 'test',
        category: { name: 'test', isFoodType: false },
        price_per_person: 0,
        latitude: 40.411128,
        longitude: -3.69346,
        location: 'test',
        dateEnd: 'test',
        dateStart: 'test'
    }];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addUserPoint', () => {
    const { lng, lat } = component.map.getCenter();
    const userPoint = turf.featureCollection([ turf.point([ lng, lat ])]);
    component.map.on('load', () => {
      component.addUserPoint(userPoint);
      expect(component).toBeTruthy();
    });
  });

  it('makePopup', () => {
    component.map.on('load', () => {
      component.makePopup(component._places[1], 0, 12);
      expect(component).toBeTruthy();
    });
  });

  it('flyToPoint', () => {
    component.map.on('load', () => {
      fixture.detectChanges();
      component.flyToPoint(component._places[1]);
      expect(component).toBeTruthy();
    });
  });

  it('getOptimizedRoute', () => {
    component.map.on('load', () => {
      component.map.addSource('route', {
        type: 'geojson',
        data: turf.featureCollection([])
      });
      component.getOptimizedRoute(fakeCoordinates, turf.featureCollection([]));
      expect(component).toBeTruthy();
    });
  });

  afterEach(() => {
    component.map.on('load', () => {
      if (component.map.getLayer('warehouse')) {
        component.map.removeLayer('warehouse');
      }
    });
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { Place } from 'src/app/shared/models/place';
import { environment } from '../../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/helpers';

import { MapService } from '../service/map.service';
import { of } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http/http.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  let fakeResponse: any;
  const mapbox = mapboxgl as typeof mapboxgl;
  mapbox.accessToken = environment.mapBoxToken;

  const fakeCoordinates: any[] = [[-3.707884, 40.421528], [-3.69346, 40.411128]];
  const places: any = [
    { latitude: 40.416988, longitude: -3.70351 },
    {
      title: 'test',
      description: 'test2',
      category: { name: 'test', isFoodType: false },
      price_per_person: 0,
      latitude: 40.411128,
      longitude: -3.69346,
      location: 'test',
      dateEnd: 'test',
      dateStart: 'test'
  }];

  beforeEach(async(() => {
    fakeResponse = { data: { routes: [{ legs: [{ distance: 200}, { distance: 300 }], geometry: [{ }], distance: 9000 }]}};
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
    component.id = 'map0';
    component.mapId = 'map0';
    component.map = new mapboxgl.Map({
      container: component.mapId,
      style: `mapbox://styles/mapbox/streets-v11`,
      center: [ -3.707884, 40.421528 ],
      zoom: 15,
    });

    component.places = places;

    component.markers = [{ place: places[1], marker: new mapboxgl.Marker({ color: '#7862DA' })
        .setLngLat([-3.69346, 40.411128])
        .addTo(component.map)
    }];

    fixture.detectChanges();
  }));

  it('addUserPoint', (done: DoneFn) => {
    const { lng, lat } = component.map.getCenter();
    const userPoint = turf.featureCollection([ turf.point([ lng, lat ])]);
    component.map.on('load', () => {
      component.addUserPoint(userPoint);
      expect(component).toBeTruthy();
      done();
    });
  });

  it('makePopup', (done: DoneFn) => {
    component.map.on('load', () => {
      component.makePopup(component.mapPlaces[1], 0, 12);
      expect(component).toBeTruthy();
      done();
    });
  });

  it('flyToPoint', (done: DoneFn) => {
    component.map.on('load', () => {
      fixture.detectChanges();
      component.flyToPoint(component.mapPlaces[1]);
      expect(component).toBeTruthy();
      done();
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

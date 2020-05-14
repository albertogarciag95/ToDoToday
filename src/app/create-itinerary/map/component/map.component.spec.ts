import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { Place } from 'src/app/shared/models/place';
import { environment } from '../../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let myMarker: mapboxgl.Marker;
  const mapbox = mapboxgl as typeof mapboxgl;
  mapbox.accessToken = environment.mapBoxToken;

  const map = new mapboxgl.Map({
    container: document.createElement('div'),
    style: `mapbox://styles/mapbox/streets-v11`,
    center: [-3.707884, 40.421528],
    zoom: 15,
  });

  const places: Place[] = [{
    title: 'test',
    description: 'test',
    category: { name: 'test', isFoodType: false },
    price_per_person: 0,
    latitude: 0,
    longitude: 0,
    location: 'test',
    dateEnd: 'test',
    dateStart: 'test'
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.places = places;
    myMarker = new mapboxgl.Marker({ color: '#7862DA' })
        .setLngLat([places[0].longitude, places[0].latitude])
        .addTo(map);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the map', () => {
    component.places = places;
    component.addPlacesToMap(places);
    myMarker.getElement().dispatchEvent(new Event('mouseenter'));
  });

  it('should fly to point', () => {
    component.flyToPoint(places[0]);
    expect(component).toBeTruthy();
  });

  it('should make a popup', () => {
    component.makePopup(places[0]);
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectDialog } from './map-select-dialog';
import { MapService } from '../../map/service/map.service';
import { MatDialogRef, MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

describe('MapSelectDialog', () => {
  let component: MapSelectDialog;
  let fixture: ComponentFixture<MapSelectDialog>;
  const mapbox = mapboxgl as typeof mapboxgl;
  mapbox.accessToken = environment.mapBoxToken;

  let map = new mapboxgl.Map({
    container: document.createElement('div'),
    style: `mapbox://styles/mapbox/streets-v11`,
    center: [-3, 30],
    zoom: 15
  });

  let response: any;
  let dialogRefSpyObj = jasmine.createSpyObj({ close: null });

  const spy = jasmine.createSpyObj('MapService', ['getGeocoding']);
  spy.getGeocoding.and.returnValue( of(response) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectDialog ],
      imports: [ MatDialogModule ],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MapService, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: { userLocation: [-3, 30] }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSelectDialog);
    component = fixture.componentInstance;
    component.map = map;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

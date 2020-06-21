import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { Category } from '../../models/category';
import { Place } from '../../models/place';

import * as mapboxgl from 'mapbox-gl';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  const fakeCoordinates: any[] = [[-3.70351, 40.416988], [-3.69346, 40.411128]];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, OverlayModule, MatDialogModule, BrowserAnimationsModule ],
      providers: [ HttpService, MatDialog ]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve get from de API', () => {
    const categories: Category[] = [
      { name: 'Cultura y arte', isFoodType: false },
      { name: 'Deporte', isFoodType: false },
      { name: 'Gastronomía', isFoodType: false },
      { name: 'Música', isFoodType: false },
      { name: 'Naturaleza', isFoodType: false },
      { name: 'Ocio y entretenimiento', isFoodType: false }
    ];

    service.get('/categories').subscribe(
      response => {
        expect(response.length).toBe(6);
        expect(response).toEqual(categories);
      },
      error => error
    );

    const request = httpMock.expectOne(`${HttpService.API_END_POINT}/categories`);
    expect(request.request.method).toBe('GET');

    request.flush(categories);
    httpMock.verify();
  });

  it('should retrieve post from de API', () => {

    const places: Place[] = [
      {
        title: 'test',
        description: 'test',
        category: { name: 'test', isFoodType: false },
        price_per_person: 0,
        latitude: 0,
        longitude: 0,
        location: 'test',
        dateEnd: 'test',
        dateStart: 'test'
      }
    ];

    service.post('/itinerary', { name: 'Experiencia Gastronómica' }).subscribe(
      response => {
        expect(response.length).toBe(1);
      },
      error => error
    );

    const request = httpMock.expectOne(`${HttpService.API_END_POINT}/itinerary`);
    expect(request.request.method).toBe('POST');

    request.flush(places);
  });

  afterEach(() => {
    httpMock.verify();
  });
});


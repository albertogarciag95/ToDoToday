import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { Category } from '../models/category';
import { Place } from '../models/place';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HttpService ]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve get from de API', () => {
    const categories: Category[] = [
      { name: 'Cultura y arte' },
      { name: 'Deporte' },
      { name: 'Gastronomía' },
      { name: 'Música' },
      { name: 'Naturaleza' },
      { name: 'Ocio y entretenimiento' }
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
  });

  it('should retrieve post from de API', () => {

    const places: Place[] = [
      {
        title: 'test',
        description: 'test',
        category: { name: 'test' },
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


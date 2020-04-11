import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { Category } from '../models/category';

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

  afterEach(() => {
    httpMock.verify();
  });
});


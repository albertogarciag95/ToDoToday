import { HttpService } from './http.service';
import { defer } from 'rxjs';
import { Category } from '../models/category';

describe('HttpService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpService: HttpService;

  let categories: Category[] = [
    { name: "Cultura y arte" },
    { name: "Deporte" },
    { name: "Gastronomía" },
    { name: "Música" },
    { name: "Naturaleza" },
    { name: "Ocio y entretenimiento" }
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpService = new HttpService(<any> httpClientSpy);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    httpClientSpy.get.and.returnValue(asyncData(categories));

    httpService.get(HttpService.API_END_POINT + '/categories').subscribe(
      response => expect(response.body).toEqual(categories, 'expected categories'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});

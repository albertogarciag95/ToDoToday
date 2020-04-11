import { async } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateItineraryService } from './create-itinerary.service';
import { Category } from '../../shared/models/category';

describe('CreateItineraryService', () => {
  let service: CreateItineraryService;

  const categories:Category[] = [
    { name: "Cultura y arte" },
    { name: "Deporte" },
    { name: "Gastronomía" },
    { name: "Música" },
    { name: "Naturaleza" },
    { name: "Ocio y entretenimiento" }
  ];

  beforeEach(async(() => {
    let httpServiceSpy = jasmine.createSpyObj('HttpService', ['get']);
    httpServiceSpy.get.and.returnValue( of(categories) );

    service = new CreateItineraryService(httpServiceSpy)
  }));

  it('#getCategories should return value from observable',
    (done: DoneFn) => {

    service.getCategories().subscribe(value => {
      expect(value).toBe(categories);
      done();
    });
  });
});

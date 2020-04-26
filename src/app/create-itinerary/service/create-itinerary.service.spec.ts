import { async } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateItineraryService } from './create-itinerary.service';
import { Category } from '../../shared/models/category';
import { Place } from 'src/app/shared/models/place';

describe('CreateItineraryService', () => {
  let service: CreateItineraryService;

  const categories: Category[] = [
    { name: 'Cultura y arte' },
    { name: 'Deporte' },
    { name: 'Gastronomía' },
    { name: 'Música' },
    { name: 'Naturaleza' },
    { name: 'Ocio y entretenimiento' }
  ];

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

  beforeEach(async(() => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['get', 'post']);
    httpServiceSpy.get.and.returnValue( of(categories) );
    httpServiceSpy.post.and.returnValue( of(places) );

    service = new CreateItineraryService(httpServiceSpy);
  }));

  it('#getCategories should return value from observable', (done: DoneFn) => {
    service.getCategories().subscribe(value => {
      expect(value).toBe(categories);
      done();
    });
  });

  it('#createItinerary should return value from observable', (done: DoneFn) => {
    service.createItinerary({ category: 'test' }).subscribe(value => {
      expect(value).toBe(places);
      done();
    });
  });

});

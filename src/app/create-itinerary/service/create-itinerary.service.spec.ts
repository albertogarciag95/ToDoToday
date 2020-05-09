import { async } from '@angular/core/testing';
import { of } from 'rxjs';

import { CreateItineraryService } from './create-itinerary.service';
import { Category } from '../../shared/models/category';
import { Place } from 'src/app/shared/models/place';

describe('CreateItineraryService', () => {
  let service: CreateItineraryService;

  const categories: Category[] = [
    { name: 'Cultura y arte', isFoodType: false },
    { name: 'Deporte', isFoodType: false },
    { name: 'Gastronomía', isFoodType: false },
    { name: 'Música', isFoodType: false },
    { name: 'Naturaleza', isFoodType: false },
    { name: 'Ocio y entretenimiento', isFoodType: false }
  ];

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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItineraryComponent } from './create-itinerary.component';
import { CreateItineraryService } from '../service/create-itinerary.service';
import { HttpService } from '../../shared/services/http.service';
import { Category } from '../../shared/models/category';
import { of } from 'rxjs';
import { Place } from 'src/app/shared/models/place';


describe('CreateItineraryComponent', () => {
  let component: CreateItineraryComponent;

  const categories: Category[] = [
    { name: 'Cultura y arte', isFoodType: false },
    { name: 'Deporte', isFoodType: false },
    { name: 'Gastronomía', isFoodType: false },
    { name: 'Música', isFoodType: false },
    { name: 'Naturaleza', isFoodType: false },
    { name: 'Ocio y entretenimiento', isFoodType: false }
  ];

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

  let fixture: ComponentFixture<CreateItineraryComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CreateItineraryService', ['getCategories', 'createItinerary']);
    spy.getCategories.and.returnValue( of(categories) );
    spy.createItinerary.and.returnValue( of(places) );

    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['get', 'post']);
    httpServiceSpy.get.and.returnValue( of(categories) );
    httpServiceSpy.post.and.returnValue( of(places) );

    TestBed.configureTestingModule({
      declarations: [ CreateItineraryComponent ],
      providers: [
        { provide: CreateItineraryService, useValue: spy },
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(CreateItineraryComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }));


  it('should create', async(() => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));

  it('should modify second selector onFirstCategoryChanges', (() => {
    component.onFirstCategoryChanges('Gastronomía', 0);
    expect(component.secondOptionCategories.includes({ name: 'Gastronomía', isFoodType: false })).toBeFalse();
  }));

  it('should modify second selector onSecondCategoryChanges', (() => {
    component.onSecondCategoryChanges('Gastronomía', 1);
    expect(component.firstOptionCategories.includes({ name: 'Gastronomía', isFoodType: false })).toBeFalse();
  }));

  it('should createItinerary', async(() => {
    component.createItinerary();
    expect(component.places).toEqual(places);
  }));

});

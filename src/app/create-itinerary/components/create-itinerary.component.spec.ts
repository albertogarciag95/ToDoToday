import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItineraryComponent } from './create-itinerary.component';
import { CreateItineraryService } from '../service/create-itinerary.service';
import { HttpService } from '../../shared/services/http/http.service';
import { Category } from '../../shared/models/category';
import { of } from 'rxjs';
import { Place } from 'src/app/shared/models/place';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ResultsComponent } from 'src/app/results/components/results.component';

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
    spy.createItinerary.and.returnValue( of({
      categoryPlaces: places,
      secondCategoryPlaces: [],
      dinnerPlaces: [],
      lunchPlaces: []
    }) );

    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['get', 'post']);
    httpServiceSpy.get.and.returnValue( of(categories) );
    httpServiceSpy.post.and.returnValue( of(places) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'results', component: ResultsComponent }])
      ],
      declarations: [ CreateItineraryComponent ],
      providers: [
        { provide: CreateItineraryService, useValue: spy },
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(CreateItineraryComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    component.firstCategorySelected = 'test';
    component.secondCategorySelected = '';
    component.lunchCategorySelected = '';
    component.dinnerCategorySelected = '';
  }));


  it('should create', async(() => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));


  it('firstCategorySelector should listen selectedChange event', (() => {
    const selector = fixture.debugElement.query(By.css('#firstCategory'));
    selector.triggerEventHandler('selectedChange', {});
    expect(component.fieldStates[2]).toEqual('active');
  }));

  it('secondCategorySelector should listen selectedChange event', (() => {
    const selector = fixture.debugElement.query(By.css('#secondCategorySelector'));
    selector.triggerEventHandler('selectedChange', {});
    expect(component.fieldStates[3]).toEqual('active');
  }));

  it('should createItinerary', async(() => {
    component.createItinerary();
    expect(component).toBeTruthy();
  }));

  it('buildRequestObject with price = Nada', async(() => {
    component.firstCategorySelected = { selected: 'Test', price: 'Nada' };
    expect(component.buildRequestBody().category)
      .toEqual({ selected: 'Test', price: { initRange: 0, finalRange: 0 } });
  }));

  it('buildRequestObject with price valid', async(() => {
    component.firstCategorySelected = { selected: 'Test', price: 'Entre 0$ y 10$' };
    expect(component.buildRequestBody().category)
      .toEqual({ selected: 'Test', price: { initRange: 0, finalRange: 10 } });
  }));

});

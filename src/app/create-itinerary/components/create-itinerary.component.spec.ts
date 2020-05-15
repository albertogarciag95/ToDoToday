import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItineraryComponent } from './create-itinerary.component';
import { CreateItineraryService } from '../service/create-itinerary.service';
import { HttpService } from '../../shared/services/http.service';
import { Category } from '../../shared/models/category';
import { of } from 'rxjs';
import { Place } from 'src/app/shared/models/place';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import fakeResponse from './mocks/fakeResponse';


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
      declarations: [ CreateItineraryComponent ],
      providers: [
        FormBuilder,
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
    component.map = new ElementRef({ scrollIntoView() {} });
  }));


  it('should create', async(() => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));


  it('firstCategorySelector should listen selectedChange event', (() => {
    const selector = fixture.debugElement.query(By.css('#firstCategory'));
    selector.triggerEventHandler('selectedChange', {});
    expect(component.fieldStates[1]).toEqual('active');
  }));

  it('secondCategorySelector should listen selectedChange event', (() => {
    const selector = fixture.debugElement.query(By.css('#secondCategorySelector'));
    selector.triggerEventHandler('selectedChange', {});
    expect(component.fieldStates[2]).toEqual('active');
  }));

  it('should enable map', async(() => {
    component.enableMap(fakeResponse);
    expect(component.mapOptionSelected).toBe(fakeResponse);
  }));

  it('should createItinerary', async(() => {
    component.createItinerary();
    expect(component).toBeTruthy();
  }));

});

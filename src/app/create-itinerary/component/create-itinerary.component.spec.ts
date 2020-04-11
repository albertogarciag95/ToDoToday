import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItineraryComponent } from './create-itinerary.component';
import { CreateItineraryService } from '../service/create-itinerary.service';
import { HttpService } from '../../shared/services/http.service';
import { Category } from '../../shared/models/category';
import { of } from 'rxjs';


describe('CreateItineraryComponent', () => {
  let component: CreateItineraryComponent;

  const categories:Category[] = [
    { name: "Cultura y arte" },
    { name: "Deporte" },
    { name: "Gastronomía" },
    { name: "Música" },
    { name: "Naturaleza" },
    { name: "Ocio y entretenimiento" }
  ];

  let fixture: ComponentFixture<CreateItineraryComponent>;

  beforeEach(async(() => {
    let spy = jasmine.createSpyObj('CreateItineraryService', ['getCategories']);
    let httpServiceSpy = jasmine.createSpyObj('HttpService', ['get']);

    spy.getCategories.and.returnValue( of(categories) );
    httpServiceSpy.get.and.returnValue( of(categories) );

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

});

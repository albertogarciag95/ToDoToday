import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItineraryComponent } from './create-itinerary.component';
import { CreateItineraryService } from './create-itinerary.service';
import { HttpService } from '../shared/services/http.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CreateItineraryComponent', () => {
  let component: CreateItineraryComponent;
  let fixture: ComponentFixture<CreateItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItineraryComponent ],
      imports: [  ],
      providers: [ CreateItineraryService, HttpService, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

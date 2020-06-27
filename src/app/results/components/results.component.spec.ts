import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { fakeState } from '../../shared/mocks/fake-state';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ResultsService } from '../service/results.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  const spy = jasmine.createSpyObj('ResultsService', ['startItinerary']);
  spy.startItinerary.and.returnValue( of(null) );

  beforeEach(async(() => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['put']);
    httpServiceSpy.put.and.returnValue( of(null) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ ResultsComponent ],
      providers: [
        { provide: ResultsService, useValue: spy },
        { provide: HttpService, useValue: httpServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    history.pushState(fakeState, 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home', () => {
    history.pushState({ userLocation: null }, 'test');
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should startItinerary', (done: DoneFn) => {
    component.startItinerary();
    expect(spy.startItinerary).toHaveBeenCalled();
    done();
  });

  it('getTotalPrice', () => {
    const test = [{ price_per_person: 3 }, { price_per_person: 5 }];
    expect(component.getTotalPrice(test)).toBe(8);
  });

  it('onOptionChanged', (done: DoneFn) => {
    const selector = fixture.debugElement.query(By.css('.tabGroup'));
    selector.triggerEventHandler('focusChange', { index: 1 });
    expect(component.currentOption).toEqual(1);
    done();
  });
});

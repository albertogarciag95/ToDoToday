import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: Router;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    component.navigateToCreateItinerary();

    const spy = routerSpy.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs).toBe('/create-itinerary', 'should nav to HeroDetail for first hero');
  });

});

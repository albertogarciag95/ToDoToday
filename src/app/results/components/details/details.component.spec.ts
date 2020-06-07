import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { Place } from 'src/app/shared/models/place';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  const place: any = {
    title: 'test',
    description: 'test',
    category: 'test',
    price_per_person: 0,
    latitude: 0,
    longitude: 0,
    location: 'test',
    dateEnd: 'test',
    dateStart: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.details = { firstPlace: { place } };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

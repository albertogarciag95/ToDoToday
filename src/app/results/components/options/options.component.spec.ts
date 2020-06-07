import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { OptionsComponent } from './options.component';
import { By } from '@angular/platform-browser';

describe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    component.result = [{ random: 'random' }];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('press button details', fakeAsync(() => {
    spyOn(component.detailsChanged, 'emit');

    const button = fixture.debugElement.query(By.css('#buttonDetails'));
    button.triggerEventHandler('click', { random: 'random' } );

    expect(component.detailsChanged.emit).toHaveBeenCalledWith({ random: 'random' });
    expect(component).toBeTruthy();
  }));


  it('press button map', fakeAsync(() => {
    spyOn(component.mapOptionChanged, 'emit');

    const button = fixture.debugElement.query(By.css('#mapDetails'));
    button.triggerEventHandler('click', { random: 'random' } );

    expect(component.mapOptionChanged.emit).toHaveBeenCalledWith({ random: 'random' });
    expect(component).toBeTruthy();
  }));
});

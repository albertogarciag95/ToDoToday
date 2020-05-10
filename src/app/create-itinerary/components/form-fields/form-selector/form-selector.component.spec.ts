import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormSelectorComponent } from './form-selector.component';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('FormSelectorComponent', () => {

  let component: FormSelectorComponent;
  let fixture: ComponentFixture<FormSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectorComponent);
    component = fixture.componentInstance;
    component.element = new ElementRef({ scrollIntoView() {} });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formSelector should listen selectionChange event', fakeAsync(() => {
    const selector = fixture.debugElement.query(By.css('mat-select'));
    selector.triggerEventHandler('selectionChange', {});
    tick(100);
    fixture.detectChanges();

    expect(component.checkboxChecked).toBe(false);
    expect(component.state).toBe('completed');
  }));

  it('formSelector should listen change checkbox event (true)', fakeAsync(() => {
    component.required = false;
    component.state = 'disabled';
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', { checked: true });

    tick(100);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  it('formSelector should listen change checkbox event (false)', (() => {
    component.required = false;
    component.state = 'disabled';
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', { checked: false });


    expect(component).toBeTruthy();
  }));

  it('formSelector should listen change checkbox event (false but selected = true)', (() => {
    component.required = false;
    component.state = 'disabled';
    component.selected = 'random';

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('mat-checkbox'));
    checkbox.triggerEventHandler('change', { checked: false });


    expect(component).toBeTruthy();
  }));

  it('formSelector should listen event on click link', (() => {
    component.state = 'completed';
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'));
    link.triggerEventHandler('click', {});

    expect(component.state).toBe('active');
  }));
});

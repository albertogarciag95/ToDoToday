import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateComponent } from './form-date.component';
import { DateAdapter } from '@angular/material/core';
import { By } from '@angular/platform-browser';

describe('FormDateComponent', () => {
  let component: FormDateComponent;
  let fixture: ComponentFixture<FormDateComponent>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DateAdapter', ['setLocale']);

    TestBed.configureTestingModule({
      declarations: [ FormDateComponent ],
      providers: [
        { provide: DateAdapter, useValue: spy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add content on input datepicker', () => {
    const input = fixture.debugElement.query(By.css('.datePickerInput'));
    input.triggerEventHandler('dateChange', { value: 'datewrong'});
    expect(component.date).toEqual('datewrong');
  });

  it('check toggle selecting today', () => {
    spyOn(component.dateChange, 'emit');

    const toggle = fixture.debugElement.query(By.css('.field-today'));
    toggle.triggerEventHandler('change', { checked: true });
    expect(component.dateChange.emit).toHaveBeenCalledWith(new Date());
  });

  it('date is ok and button next pressed', () => {
    component.date = { _d: 'anyMoment'};
    spyOn(component.dateChange, 'emit');

    const button = fixture.debugElement.query(By.css('.button-next'));
    button.triggerEventHandler('click', {});
    expect(component.dateChange.emit).toHaveBeenCalledWith(component.date._d);
  });

  it('date has wrong format, shows error', () => {
    expect(component.getErrorMessage('wrongDate')).toBe('Por favor, introduce una fecha con formato válido');
  });

  it('date is empty, shows error', () => {
    expect(component.getErrorMessage('')).toBe('Por favor, introduce una fecha');
  });

  it('date is OK, do not show nothing', () => {
    expect(component.getErrorMessage('02/02/2021')).toBe('');
  });
});

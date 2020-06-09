import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateComponent } from './form-date.component';
import { DateAdapter } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

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
    component.state = 'active';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.datePickerInput'));
    input.triggerEventHandler('dateChange', { value: 'datewrong'});
    expect(component.date).toEqual('datewrong');
  });

  it('check toggle selecting today', () => {
    component.state = 'active';
    fixture.detectChanges();
    spyOn(component.dateChange, 'emit');

    const toggle = fixture.debugElement.query(By.css('.field-today'));
    toggle.triggerEventHandler('change', { checked: true });
    expect(component.dateSummary).toEqual('Hoy');
  });

  it('date is ok and button next pressed', () => {
    component.state = 'active';
    fixture.detectChanges();
    component.date = { _d: { date: 22, month: 4, year: 2023 }};
    const control = new FormControl(moment('22/4/2023', 'DD/MM/YYYY'));
    fixture.componentInstance.dateControl = control;
    fixture.detectChanges();

    spyOn(component.dateChange, 'emit');

    const button = fixture.debugElement.query(By.css('.button-next'));
    button.triggerEventHandler('click', {});
    expect(component.dateChange.emit).toHaveBeenCalledWith(component.date._d);
  });

  it('date has wrong format, shows error', () => {
    expect(component.validateDate('wrongDate')).toBe('Por favor, introduce una fecha con formato válido');
  });

  it('date is empty, shows error', () => {
    expect(component.validateDate('')).toBe('Por favor, introduce una fecha');
  });

  it('date is OK, do not show nothing', () => {
    expect(component.validateDate('02/02/2021')).toBe('');
  });

  it('date is ok and button next pressed', () => {
    component.state = 'completed';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.edit'));
    button.triggerEventHandler('click', {});
    expect(component.state).toBe('active');
  });
});

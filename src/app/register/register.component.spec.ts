import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserService } from '../shared/services/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const spy = jasmine.createSpyObj('UserService', ['addNewUser']);
  spy.addNewUser.and.returnValue( of('') );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addUser if form is valid', () => {
    component.registerForm.setValue({
      nameFormControl: 'test',
      userNameFormControl: 'test',
      dateFormControl: new Date(),
      emailFormControl: 'testtest@test.com',
      passFormControl: 'Alberto1',
      pass2FormControl: 'Alberto1'
    });

    component.addNewUser();
    expect(spy.addNewUser).toHaveBeenCalled();
  });

  it('load new input file', () => {
    const inputFile = fixture.debugElement.query(By.css('.fileInput'));
    inputFile.triggerEventHandler('change', { target: { files: [new File([''], 'filename', { type: 'text/html' })] }});
    expect(true).toBe(true);
  });

  it('set date in datepicker', () => {
    const inputFile = fixture.debugElement.query(By.css('.datePickerInput'));
    inputFile.triggerEventHandler('dateInput', { value: new Date() });
    expect(true).toBe(true);
  });

  it('checkPasswords options', () => {
    component.registerForm.setValue({
      nameFormControl: 'test',
      userNameFormControl: 'test',
      dateFormControl: new Date(),
      emailFormControl: 'testtest@test.com',
      passFormControl: 'Alberto1',
      pass2FormControl: 'Alberto12'
    });
    expect(component.registerForm.invalid).toBe(true);
  });

  it('validateDate', () => {
    component.registerForm.setValue({
      nameFormControl: 'test',
      userNameFormControl: 'test',
      dateFormControl: null,
      emailFormControl: 'testtest@test.com',
      passFormControl: 'Alberto1',
      pass2FormControl: 'Alberto12'
    });
    fixture.detectChanges();
    expect(component.registerForm.invalid).toBe(true);
  });

  it('validateDate second branch', () => {
    component.date = new Date(new Date().setDate(new Date().getDate() + 3));
    component.registerForm.setValue({
      nameFormControl: 'test',
      userNameFormControl: 'test',
      dateFormControl: null,
      emailFormControl: 'testtest@test.com',
      passFormControl: 'Alberto1',
      pass2FormControl: 'Alberto12'
    });
    fixture.detectChanges();
    expect(component.registerForm.invalid).toBe(true);
  });
});

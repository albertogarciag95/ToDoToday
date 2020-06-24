import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/services/auth/auth.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateUserLogged', 'login']);
  authServiceSpy.updateUserLogged.and.returnValue(null);
  authServiceSpy.login.and.returnValue(of({ user: 'User test', logged: true }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, BrowserAnimationsModule ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', (done: DoneFn) => {
    component.userFormControl.setValue('test');
    component.passFormControl.setValue('Testtest1');

    component.login();
    expect(authServiceSpy.login).toHaveBeenCalled();
    done();
  });

  it('handleValidations', () => {
    component.handleValidations({ logged: false });
    expect(component.showLoginError).toBe(true);
  });

  it('goToRegister', () => {
    const selector = fixture.debugElement.query(By.css('.link'));
    selector.triggerEventHandler('click', {});
  })
});

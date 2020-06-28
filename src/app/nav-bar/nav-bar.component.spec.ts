import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let routerSpy: Router;
  let fixture: ComponentFixture<NavBarComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateUserLogged', 'currentUser']);
  authServiceSpy.updateUserLogged.and.returnValue(null);
  authServiceSpy.currentUser = of({ name: 'Test test', file: 'test' });

  const domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ NavBarComponent, LoginComponent ],
      providers: [
        { provide: DomSanitizer, useValue: domSanitizerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

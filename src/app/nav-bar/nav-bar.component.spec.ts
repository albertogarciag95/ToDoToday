import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;

  let fixture: ComponentFixture<NavBarComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', ['updateUserLogged', 'currentUser']);
  authServiceSpy.updateUserLogged.and.returnValue(null);
  authServiceSpy.currentUser = of({ name: 'Test test', file: 'test' });

  const domSanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ NavBarComponent ],
      providers: [
        { provide: DomSanitizer, useValue: domSanitizerSpy },
        { provide: AuthService, useValue: authServiceSpy }
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

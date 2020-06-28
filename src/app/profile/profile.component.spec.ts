import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';
import { ProfileService } from './profile.service';
import { User } from '../shared/models/user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const userInfo: User = {
    userName: 'test',
    name: 'test',
    birthDate: new Date(),
    email: 'test@test',
    userImage: atob('test'),
    itineraries: [{
      places: [{
        title: 'test'
      }],
      startDate: new Date().toISOString(),
      startPoint: 'test',
      totalPrice: 1,
      totalDistance: 1
    }]
  }
  
  const profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getUserInfo']);
  profileServiceSpy.getUserInfo.and.returnValue( of(userInfo) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

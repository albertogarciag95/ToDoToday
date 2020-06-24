import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationComponent } from './form-location.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapSelectDialog } from '../../dialogs/map-select-dialog/map-select-dialog';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

const fakeData = {
  selected: [-3, 30],
  location: 'miau'
};

class MdDialogMock {
  open() {
    return {
      afterClosed: () => of(fakeData)
    };
  }
}

describe('FormLocationComponent', () => {
  let component: FormLocationComponent;
  let fixture: ComponentFixture<FormLocationComponent>;
  let fixtureDialog: ComponentFixture<MapSelectDialog>;
  let debugElement: DebugElement;

  let dialog: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        OverlayModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ FormLocationComponent ],
      providers: [
        { provide: MatDialogRef, useValue: MdDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        HttpService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);

    fixture = TestBed.createComponent(FormLocationComponent);
    fixtureDialog = TestBed.createComponent(MapSelectDialog);

    debugElement = fixtureDialog.debugElement;
    component = fixture.componentInstance;
    spyOn(component, 'getMyLocation').and.callThrough();
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(function() {
      const position = { coords: { latitude: 32, longitude: -96 } };
      arguments[0](position);
    });

    fixture.detectChanges();
  });

  it('should open map on select other point', () => {
    const link = fixture.debugElement.query(By.css('.location-options a'));
    link.triggerEventHandler('click', {});

    expect(component).toBeTruthy();
  });

  it('should open map dialog', () => {
    const position = { coords: { latitude: 30, longitude: -3 }};

    component.openMapDialog(position);

    const map = debugElement.query(By.css('#map'));
    map.triggerEventHandler('click', null);

    const okButton = debugElement.query(By.css('#buttonOkSelectDialog'));
    okButton.triggerEventHandler('click', null);

    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(fakeData)});
  });

  it('should edit field', () => {
    component.state = 'completed';

    fixture.detectChanges();
    const editlink = fixture.debugElement.query(By.css('.completed a'));
    editlink.triggerEventHandler('click', null);

    expect(component.state === 'active').toBeTrue();

  });

  it('toggle my location', () => {
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    toggle.triggerEventHandler('change', { checked: true });

    expect(component.getMyLocation).toHaveBeenCalled();
  });

  it('toggle my location (uncheck)', () => {
    spyOn(component.userLocationChange, 'emit');
    const toggle = fixture.debugElement.query(By.css('mat-slide-toggle'));
    toggle.triggerEventHandler('change', { checked: false });

    expect(component.userLocationChange.emit).toHaveBeenCalledWith(undefined);
  });

  it('toggle my location (uncheck)', () => {
    spyOn(component.userLocationChange, 'emit');
    const position = { coords: { latitude: 30, longitude: -3 }};
    component.returnMyLocation(position);

    expect(component.userLocationChange.emit).toHaveBeenCalledWith(
      { latitude: position.coords.latitude, longitude: position.coords.longitude });
  });
});

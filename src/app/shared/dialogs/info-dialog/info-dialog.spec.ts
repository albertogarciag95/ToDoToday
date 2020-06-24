import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialog } from './info-dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('InfoDialog', () => {
  let component: InfoDialog;
  let fixture: ComponentFixture<InfoDialog>;
  const dialogRefSpyObj = jasmine.createSpyObj({ close: () => {}});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDialog ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: { status: 400, error: 'Test', userAdded: true }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showErrorDialog status 0', () => {
    component.showErrorDialog(0, null);
    expect(component.title).toBe('¡Error de conexión!');
  });

  it('showErrorDialog status 403', () => {
    component.showErrorDialog(403, null);
    expect(component.title).toBe('Solo será un momento');
  });

  it('showErrorDialog status 404', () => {
    component.showErrorDialog(404, 'Itinerary not found');
    expect(component.title).toBe('Lo sentimos :(');
  });

  it('showErrorDialog status 500', () => {
    component.showErrorDialog(500, null);
    expect(component.title).toBe('¡Vaya!');
  });

  it('dialogRef close', () => {
    component.close();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  });
});

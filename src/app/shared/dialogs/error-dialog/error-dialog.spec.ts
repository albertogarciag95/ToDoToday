import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialog } from './error-dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ErrorDialog', () => {
  let component: ErrorDialog;
  let fixture: ComponentFixture<ErrorDialog>;
  const dialogRefSpyObj = jasmine.createSpyObj({ close: () => {}});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDialog ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: { status: 400, error: 'Test' }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

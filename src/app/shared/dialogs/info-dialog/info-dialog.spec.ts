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
        { provide: MAT_DIALOG_DATA, useValue: { status: 400, error: 'Test' }}
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
});

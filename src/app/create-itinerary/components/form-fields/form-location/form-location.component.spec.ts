import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationComponent } from './form-location.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

describe('FormLocationComponent', () => {
  let component: FormLocationComponent;
  let fixture: ComponentFixture<FormLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ OverlayModule, MatDialogModule ],
      declarations: [ FormLocationComponent ],
      providers: [ MatDialog, MatDialogModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

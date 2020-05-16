import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectDialog } from './map-select-dialog';

describe('MapSelectDialog', () => {
  let component: MapSelectDialog;
  let fixture: ComponentFixture<MapSelectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceDialogComponent } from './parking-space-dialog.component';

describe('ParkingSpaceDialogComponent', () => {
  let component: ParkingSpaceDialogComponent;
  let fixture: ComponentFixture<ParkingSpaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSpaceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

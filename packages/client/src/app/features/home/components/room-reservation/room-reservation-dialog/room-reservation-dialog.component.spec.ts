import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationDialogComponent } from './room-reservation-dialog.component';

describe('RoomReservationDialogComponent', () => {
  let component: RoomReservationDialogComponent;
  let fixture: ComponentFixture<RoomReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomReservationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

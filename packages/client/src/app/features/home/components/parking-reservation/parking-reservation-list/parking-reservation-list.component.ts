import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ParkingReservation } from '../../../models/reservations';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { ParkingReservationSpace } from '../../../models/reservation-place';

@Component({
  selector: 'app-parking-reservation-list',
  templateUrl: './parking-reservation-list.component.html',
  styleUrls: ['./parking-reservation-list.component.scss']
})
export class ParkingReservationListComponent {
  displayedColumns: string[] = ['place', 'name', 'changeStatus'];
  @Input() combinedParkingReservation: ParkingReservationSpace[];
  @Output() addParkingReservation: EventEmitter<ParkingReservation> = new EventEmitter<ParkingReservation>();
  @Output() removeParkingReservation: EventEmitter<ParkingReservation> = new EventEmitter<ParkingReservation>();
  @Input() isDisabled: boolean;
  @Input() isAddDisabled: boolean;
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  addReservation(newReservation: ParkingReservation): void {
    this.addParkingReservation.emit(newReservation);
  }

  deleteReservation(oldReservation: ParkingReservation): void {
    this.removeParkingReservation.emit(oldReservation);
  }
}

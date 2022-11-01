import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RoomReservation } from '../../../models/reservations';
import { Store } from '@ngrx/store';
import { RoomReservationSpace } from '../../../models/reservation-place';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  displayedColumns: string[] = ['room', 'place', 'screen', 'name', 'changeStatus'];
  @Input() combinedRoomReservation: RoomReservationSpace[];
  @Output() addTableReservation: EventEmitter<RoomReservation> = new EventEmitter<RoomReservation>();
  @Output() removeTableReservation: EventEmitter<RoomReservation> = new EventEmitter<RoomReservation>();
  @Input() isDisabled: boolean;
  @Input() isAddDisabled: boolean;
  user$ = this.store.select(selectUser);

  constructor(private store: Store) {}

  addReservation(newReservation: RoomReservation): void {
    this.addTableReservation.emit(newReservation);
  }

  deleteReservation(oldReservation: RoomReservation): void {
    this.removeTableReservation.emit(oldReservation);
  }
}

import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { RoomReservation } from '../../../../../shared/models/reservations.model';
import { Store } from '@ngrx/store';
import { RoomReservationSpace } from '../../../../../shared/models/reservation-place.model';
import { Table } from '../../../../../shared/models/table.model';
import { RoomSpace } from '../../../../../shared/models/room-space.model';
import { Hardware } from '../../../../../shared/models/hardware.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  displayedColumns: string[] = ['room', 'table', 'hardware', 'name', 'changeStatus'];
  @Input() tableList: Table[];
  @Input() hardwareList: Hardware[];
  @Input() roomList: RoomSpace[];
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

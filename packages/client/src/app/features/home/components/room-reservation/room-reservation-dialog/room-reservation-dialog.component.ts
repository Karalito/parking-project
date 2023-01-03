import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RoomReservation } from '../../../../../shared/models/reservations.model';
import { selectHardwareList } from '../../../../../state/hardware/hardware.selector';
import { addRoomReservation, getRoomReservation } from '../../../../../state/room-reservation/room-reservation.actions';
import { Table } from '../../../../../shared/models/table.model';
import { Hardware } from '../../../../../shared/models/hardware.model';
import { selectRoomReservation } from '../../../../../state/room-reservation/room-reservation.selector';

@Component({
  selector: 'app-room-reservation-dialog',
  templateUrl: './room-reservation-dialog.component.html',
  styleUrls: ['./room-reservation-dialog.component.scss']
})
export class RoomReservationDialogComponent implements OnInit {

  form: FormGroup;

  hardwareList$ = this._store.select(selectHardwareList);
  reservationList$ = this._store.select(selectRoomReservation);

  tableList: Table[];
  hardwareList: Hardware[];
  reservationList: RoomReservation[];
  hardwareList2: Hardware[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public roomReservation: RoomReservation,
    private _store: Store,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reservationList$.subscribe(reservationList => this.reservationList = reservationList);
    this.hardwareList$.subscribe(hardwareList => this.hardwareList = hardwareList);

    this.checkForTakenHardware(this.hardwareList, this.reservationList);
    console.log(this.hardwareList2);
    this.form = new FormGroup({
      hardwareId: new FormControl('')
    });
  }

  onSubmit(): void {

    const roomReservation: RoomReservation = {
      roomId: this.roomReservation.roomId,
      hardwareId: this.form.get('hardwareId').value ? this.form.get('hardwareId').value : undefined,
      userId: this.roomReservation.userId,
      date: this.roomReservation.date
    };

    console.log('hardware', roomReservation.hardwareId);
    this._store.dispatch(addRoomReservation({
      userId: roomReservation.userId,
      roomId: roomReservation.roomId,
      hardwareId: roomReservation.hardwareId,
      date: roomReservation.date
    }));

    this._store.dispatch(getRoomReservation({ date: this.roomReservation.date }));
  }

  checkForTakenHardware(hardwareList: Hardware[], reservationList: RoomReservation[]) {

    for (let i = 0; i < hardwareList.length; i++) {
      let found = false;
      for (let j = 0; j < reservationList.length; j++) {
        if (hardwareList[i]._id === reservationList[j].hardwareId) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.hardwareList2.push(hardwareList[i]);
      }
      
    }

  }
}

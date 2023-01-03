import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import { User } from '../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomReservationService } from '../../services/room-reservation/room-reservation.service';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
import { CalendarService } from '../../services/calendar/calendar.service';
import { RoomReservation } from '../../../../shared/models/reservations.model';
import { selectIsLoading, selectRoomReservation } from 'src/app/state/room-reservation/room-reservation.selector';
import {
  addRoomReservation,
  deleteRoomReservation,
  getRoomReservation
} from 'src/app/state/room-reservation/room-reservation.actions';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { RoomReservationSpace } from '../../../../shared/models/reservation-place.model';
import { TODAY_DATE } from '../../../../shared/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { RoomReservationDialogComponent } from './room-reservation-dialog/room-reservation-dialog.component';
import { getHardwareListAttempt } from '../../../../state/hardware/hardware.actions';
import { getTableListAttempt } from '../../../../state/table/table.actions';
import { getRoomSpaceListAttempt } from '../../../../state/room-space/room-space.actions';
import { selectTableList } from '../../../../state/table/table.selector';
import { selectHardwareList } from '../../../../state/hardware/hardware.selector';
import { selectRoomSpaceList } from '../../../../state/room-space/room-space.selector';
import { Table } from '../../../../shared/models/table.model';
import { Hardware } from '../../../../shared/models/hardware.model';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss']
})
export class RoomReservationComponent implements OnInit {
  dateFromCalendar: Moment = TODAY_DATE;
  roomReservationSpace$: Observable<RoomReservationSpace[]>;
  roomReservation$ = this.store.select(selectRoomReservation);
  tableList$ = this.store.select(selectTableList);
  hardwareList$ = this.store.select(selectHardwareList);
  roomList$ = this.store.select(selectRoomSpaceList);
  isLoading$ = this.store.select(selectIsLoading);
  user$ = this.store.select(selectUser);
  combinedRoomReservation$ = new BehaviorSubject<RoomReservationSpace[]>([]);
  isLoading: boolean;
  isDisabled: boolean;
  isAddDisabled: boolean;
  userId: string;
  freeRoomReservationSpaces: number;
  totalRoomReservationSpaces: number;
  roomReservation: RoomReservation = {
    userId: '',
    roomId: '',
    hardwareId: '',
    date: this.dateFromCalendar
  };

  constructor(
    private readonly roomReservationService: RoomReservationService,
    private calendarService: CalendarService,
    private store: Store,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.store.dispatch(getRoomSpaceListAttempt());
    this.store.dispatch(getTableListAttempt());
    this.store.dispatch(getHardwareListAttempt());
    this.store.dispatch(getRoomReservation({ date: this.dateFromCalendar }));
    this.calendarService.dateEmitter.subscribe((date: Moment) => {
      this.dateFromCalendar = date;
      this.store.dispatch(getRoomReservation({ date }));
    });
    this.roomReservationSpace$ = this.roomReservationService.getWorkPlace();

    combineLatest([this.roomReservationSpace$, this.roomReservation$])
      .subscribe(([roomSpaces, roomReservations]) => {
        this.user$.subscribe((userData) => (this.userId = userData._id));
        this.isDisabled = this.dateFromCalendar < TODAY_DATE;
        this.isAddDisabled = !!roomReservations.find((reservation) => reservation.userId === this.userId);
        this.freeRoomReservationSpaces = roomSpaces.length - roomReservations.length;
        this.totalRoomReservationSpaces = roomSpaces.length;
        for (const space of roomSpaces) {

          let existingRoomReservation = roomReservations.find(
            (reservation) => {
              if(reservation.roomId !== space._id) return reservation._id === space._id;
              return reservation.roomId === space._id;
            }
          ); // && reservation.tableId === space.tableId && reservation.hardwareId === space.hardwareId
          this.roomReservationService.getTableDetails(space.tableId).subscribe((table: Table) => {
            if (table.isErgonomic) space.table = `Number: ${table.tableNumber} Ergonomic`;
            else space.table = `Number: ${table.tableNumber}`;
          });

          if (existingRoomReservation) {
            this.roomReservationService.getUserDetails(existingRoomReservation.userId).subscribe((existingUser: User) => {
              space.name = existingUser.fullName;
              space.avatar = existingUser.avatar;
            });

            if (existingRoomReservation.hardwareId !== undefined) {
              this.roomReservationService.getHardwareDetails(existingRoomReservation.hardwareId).subscribe(
                (hardware: Hardware) => {
                  space.hardwareName = `${hardware.name} | ${hardware.size}`;
                }
              );
            }
          } else {
            space.hardwareName = '';
          }

          existingRoomReservation
            ? (this.roomReservationService
              .getUserDetails(existingRoomReservation.userId)
              .subscribe((existingUser: User) => {
                space.name = existingUser.fullName;
                space.avatar = existingUser.avatar;
              }),
              (space._id = existingRoomReservation._id))
            : (space.name = '');

        }
        this.combinedRoomReservation$.next(roomSpaces);
        this.isLoading$.subscribe((isLoading) => (this.isLoading = isLoading));
      });
  }

  openDialog(newReservation: RoomReservation) {
    const reservationToAdd: RoomReservation = {
      roomId: newReservation._id,
      userId: this.userId,
      date: this.dateFromCalendar
    };
    this.isLoading = true;
    let userHasReservation: RoomReservation;
    this.roomReservation$.subscribe((reservations) => {
      userHasReservation = reservations.find((reservation) => reservation.userId === this.userId);
    });
    if (!userHasReservation) {
      this.isLoading = false;
      return this.dialog.open(RoomReservationDialogComponent, { data: reservationToAdd });
    }
    this.isLoading = false;
    return this.notificationService.showFailAdd();
  }

  addReservation(newReservation: RoomReservation) {
    this.isLoading = true;
    let userHasReservation: RoomReservation;
    this.roomReservation$.subscribe((reservations) => {
      userHasReservation = reservations.find((reservation) => reservation.userId === this.userId);
    });
    if (!userHasReservation) {
      return this.store.dispatch(
        addRoomReservation({
          userId: this.userId,
          roomId: newReservation.roomId,
          hardwareId: newReservation.hardwareId,
          date: this.dateFromCalendar
        })
      );
    }
    this.isLoading = false;
    return this.notificationService.showFailAdd();
  }

  deleteReservation(existingReservation: RoomReservation) {
    this.isLoading = true;
    let IsUserReservation: RoomReservation;
    this.roomReservation$.subscribe((reservations) => {
      IsUserReservation = reservations.find(
        (reservation) => reservation.userId === this.userId && reservation._id === existingReservation._id
      );
    });
    if (IsUserReservation) {
      return this.store.dispatch(deleteRoomReservation({ userId: existingReservation._id }));
    }
    this.isLoading = false;
    return this.notificationService.showFailDelete();
  }

}

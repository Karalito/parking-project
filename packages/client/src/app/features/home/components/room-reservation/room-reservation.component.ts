import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import { User } from '../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { RoomReservationService } from '../../services/room-reservation/room-reservation.service';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { Moment } from 'moment';
import { CalendarService } from '../../services/calendar/calendar.service';
import { RoomReservation } from '../../../../shared/models/reservations';
import { selectIsLoading, selectRoomReservation } from 'src/app/state/room-reservation/room-reservation.selector';
import {
  addRoomReservation,
  deleteRoomReservation,
  getRoomReservation
} from 'src/app/state/room-reservation/room-reservation.actions';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { RoomReservationSpace } from '../../../../shared/models/reservation-place';
import { TODAY_DATE } from '../../../../shared/constants/constants';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss']
})
export class RoomReservationComponent implements OnInit {
  dateFromCalendar: Moment = TODAY_DATE;
  roomReservationSpace$: Observable<RoomReservationSpace[]>;
  roomReservation$ = this.store.select(selectRoomReservation);
  isLoading$ = this.store.select(selectIsLoading);
  user$ = this.store.select(selectUser);
  combinedRoomReservation$ = new BehaviorSubject<RoomReservationSpace[]>([]);
  isLoading: boolean;
  isDisabled: boolean;
  isAddDisabled: boolean;
  userId: string;
  freeRoomReservationSpaces: number;
  totalRoomReservationSpaces: number;

  constructor(
    private readonly roomReservationService: RoomReservationService,
    private calendarService: CalendarService,
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.store.dispatch(getRoomReservation({ date: this.dateFromCalendar }));
    this.calendarService.dateEmitter.subscribe((date: Moment) => {
      this.dateFromCalendar = date;
      this.store.dispatch(getRoomReservation({ date }));
    });
    this.roomReservationSpace$ = this.roomReservationService.getWorkPlace();

    combineLatest([this.roomReservationSpace$, this.roomReservation$]).subscribe(([roomSpaces, roomReservations]) => {
      this.user$.subscribe((userData) => (this.userId = userData._id));
      this.isDisabled = this.dateFromCalendar < TODAY_DATE;
      this.isAddDisabled = roomReservations.find((reservation) => reservation.userId === this.userId) ? true : false;
      this.freeRoomReservationSpaces = roomSpaces.length - roomReservations.length;
      this.totalRoomReservationSpaces = roomSpaces.length;
      for (const space of roomSpaces) {
        let existingRoomReservation = roomReservations.find(
          (reservation) => reservation.roomId === space.roomId && reservation.tableId === space.tableId
        );
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
          tableId: newReservation.tableId,
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

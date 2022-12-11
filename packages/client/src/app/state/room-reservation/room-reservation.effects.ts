import { Moment } from 'moment';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import * as RoomActions from './room-reservation.actions';
import { getRoomReservation, getRoomReservationSuccess, getRoomReservationFailure } from './room-reservation.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RoomReservationService } from 'src/app/features/home/services/room-reservation/room-reservation.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Injectable()
export class RoomReservationEffects {
  reservationDate: Moment;

  constructor(
    private actions$: Actions,
    private roomReservationService: RoomReservationService,
    private notificationService: NotificationService
  ) {}

  getRoomReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getRoomReservation),
      switchMap((payload) => {
        this.reservationDate = payload.date;
        return this.roomReservationService.getRoomReservation(payload.date)
          .pipe(
            map((roomReservation) =>
              RoomActions.getRoomReservationSuccess({ roomReservation })),
            catchError((error) => of(RoomActions.getRoomReservationFailure(error)))
        );
      })
    )
  );

  addRoomReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.addRoomReservation),
      switchMap((payload) => {
        return this.roomReservationService
          .addRoomReservation(payload.userId, payload.roomId, payload.hardwareId, payload.date)
          .pipe(
            map((roomReservation) => RoomActions.addRoomReservationSuccess({ roomReservation })),
            catchError((error) => of(RoomActions.addRoomReservationFailure(error)))
          );
      })
    )
  );

  addRoomReservationSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.addRoomReservationSuccess),
      switchMap(() => [RoomActions.getRoomReservation({ date: this.reservationDate })]),
      tap(() => this.notificationService.showSuccess())
    )
  );

  deleteRoomReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoomReservation),
      switchMap((payload) => {
        return this.roomReservationService.deleteRoomReservation(payload.userId).pipe(
          map(() => RoomActions.deleteRoomReservationSuccess()),
          catchError((error) => of(RoomActions.deleteRoomReservationFailure(error)))
        );
      })
    )
  );

  deleteRoomReservationSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoomReservationSuccess),
      switchMap(() => [RoomActions.getRoomReservation({ date: this.reservationDate })]),
      tap(() => this.notificationService.showDeleted())
    )
  );
}

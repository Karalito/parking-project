import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ParkingActions from './parking-reservation.actions';
import { of, Observable } from 'rxjs';
import { Moment } from 'moment';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { Action } from '@ngrx/store';
import { ParkingReservationService } from 'src/app/features/home/services/parking-reservation/parking-reservation.service';

@Injectable()
export class ParkingReservationEffects {
  reservationDate: Moment;

  constructor(
    private actions$: Actions,
    private parkingReservationService: ParkingReservationService,
    private notificationService: NotificationService
  ) {}

  getParkingReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ParkingActions.getParkingReservation),
      switchMap((payload) => {
        this.reservationDate = payload.date;
        return this.parkingReservationService.getParkingReservation(payload.date)
          .pipe(
            map((parkingReservation) =>
              ParkingActions.getParkingReservationSuccess({ parkingReservation })),
            catchError((error) => of(ParkingActions.getParkingReservationFailure(error)))
        );
      })
    )
  );

  addParkingReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ParkingActions.addParkingReservation),
      switchMap((payload) => {
        return this.parkingReservationService
          .addParkingReservation(payload.userId, payload.parkingPlaceId, payload.date)
          .pipe(
            map((parkingReservation) => ParkingActions.addParkingReservationSuccess({ parkingReservation })),
            catchError((error) => of(ParkingActions.addParkingReservationFailure(error)))
          );
      })
    )
  );

  addParkingReservationSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ParkingActions.addParkingReservationSuccess),
      switchMap(() => [ParkingActions.getParkingReservation({ date: this.reservationDate })]),
      tap(() => this.notificationService.showSuccess())
    )
  );

  deleteParkingReservation$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ParkingActions.deleteParkingReservation),
      switchMap((payload) => {
        return this.parkingReservationService.deleteParkingReservation(payload.userId).pipe(
          map(() => ParkingActions.deleteParkingReservationSuccess()),
          catchError((error) => of(ParkingActions.deleteParkingReservationFailure(error)))
        );
      })
    )
  );

  deleteParkingReservationSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ParkingActions.deleteParkingReservationSuccess),
      switchMap(() => [ParkingActions.getParkingReservation({ date: this.reservationDate })]),
      tap(() => this.notificationService.showDeleted())
    )
  );
}

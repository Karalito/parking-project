import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';
import { ParkingReservation } from 'src/app/features/home/models/reservations';

export const addParkingReservation = createAction(
  '[Reservation List] Add parking reservation',
  props<{ userId: string; parkingPlaceId: string; date: Moment }>()
);

export const addParkingReservationSuccess = createAction(
  '[Reservation List/API] Add parking reservations success',
  props<{ parkingReservation: ParkingReservation }>()
);

export const addParkingReservationFailure = createAction('[Reservation List/API] Add parking reservations failure');

export const deleteParkingReservation = createAction(
  '[Reservation List] Remove parking reservation',
  props<{ userId: string }>()
);

export const deleteParkingReservationSuccess = createAction(
  '[Reservation List/API] Remove parking reservations success'
);

export const deleteParkingReservationFailure = createAction(
  '[Reservation List/API] Remove parking reservations failure'
);

export const getParkingReservation = createAction(
  '[Reservation List/API] Get parking reservations',
  props<{ date: Moment }>()
);

export const getParkingReservationSuccess = createAction(
  '[Reservation List/API] Get parking reservations success',
  props<{ parkingReservation: ParkingReservation[] }>()
);

export const getParkingReservationFailure = createAction('[Reservation List/API] Get parking reservations failure');

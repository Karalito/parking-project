import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';
import { ParkingReservation } from 'src/app/shared/models/reservations.model';
import { IError } from 'protractor/built/exitCodes';

enum ActionTypes {
  ADD_PARKING_RESERVATION_ATTEMPT = '[Reservation List] Add parking reservation attempt',
  ADD_PARKING_RESERVATION_SUCCESS = '[Reservation List] Add parking reservations success',
  ADD_PARKING_RESERVATION_FAILURE = '[Reservation List] Add parking reservations failure',

  REMOVE_PARKING_RESERVATION_ATTEMPT = '[Reservation List] Remove parking reservation attempt',
  REMOVE_PARKING_RESERVATION_SUCCESS = '[Reservation List] Remove parking reservations success',
  REMOVE_PARKING_RESERVATION_FAILURE = '[Reservation List] Remove parking reservations failure',

  GET_PARKING_RESERVATIONS_ATTEMPT = '[Reservation List] Get parking reservations attempt',
  GET_PARKING_RESERVATIONS_SUCCESS = '[Reservation List] Get parking reservations success',
  GET_PARKING_RESERVATIONS_FAILURE = '[Reservation List] Get parking reservations failure',
}


export const addParkingReservation = createAction(ActionTypes.ADD_PARKING_RESERVATION_ATTEMPT, props<{ userId: string; parkingPlaceId: string; date: Moment }>());
export const addParkingReservationSuccess = createAction(ActionTypes.ADD_PARKING_RESERVATION_SUCCESS, props<{ parkingReservation: ParkingReservation }>());
export const addParkingReservationFailure = createAction(ActionTypes.ADD_PARKING_RESERVATION_FAILURE, props<{error: IError}>());

export const deleteParkingReservation = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_ATTEMPT, props<{ userId: string }>());
export const deleteParkingReservationSuccess = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_SUCCESS);
export const deleteParkingReservationFailure = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_FAILURE, props<{error: IError}>());

export const getParkingReservation = createAction(ActionTypes.GET_PARKING_RESERVATIONS_ATTEMPT, props<{ date: Moment }>());
export const getParkingReservationSuccess = createAction(ActionTypes.GET_PARKING_RESERVATIONS_SUCCESS, props<{ parkingReservation: ParkingReservation[] }>());
export const getParkingReservationFailure = createAction(ActionTypes.GET_PARKING_RESERVATIONS_FAILURE, props<{error: IError}>());

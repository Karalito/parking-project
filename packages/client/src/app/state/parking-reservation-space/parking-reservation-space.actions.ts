import { createAction } from '@ngrx/store';

enum ActionTypes {
  ADD_PARKING_RESERVATION_SPACE_ATTEMPT = '[Parking Reservation Space] Add parking reservation space attempt',
  ADD_PARKING_RESERVATION_SPACE_SUCCESS = '[Parking Reservation Space] Add parking reservation space success',
  ADD_PARKING_RESERVATION_SPACE_FAILURE = '[Parking Reservation Space] Add parking reservation space failure',

  REMOVE_PARKING_RESERVATION_SPACE_ATTEMPT = '[Parking Reservation Space] Remove parking reservation space attempt',
  REMOVE_PARKING_RESERVATION_SPACE_SUCCESS = '[Parking Reservation Space] Remove parking reservation space success',
  REMOVE_PARKING_RESERVATION_SPACE_FAILURE = '[Parking Reservation Space] Remove parking reservation space failure',

  GET_PARKING_RESERVATION_SPACE_ATTEMPT = '[Parking Reservation Space] Get parking reservation space attempt',
  GET_PARKING_RESERVATION_SPACE_SUCCESS = '[Parking Reservation Space] Get parking reservation space success',
  GET_PARKING_RESERVATION_SPACE_FAILURE = '[Parking Reservation Space] Get parking reservation space failure',
}

export const addParkingReservationSpaceAttempt = createAction(ActionTypes.ADD_PARKING_RESERVATION_SPACE_ATTEMPT);
export const addParkingReservationSpaceSuccess = createAction(ActionTypes.ADD_PARKING_RESERVATION_SPACE_SUCCESS);
export const addParkingReservationSpaceFailure = createAction(ActionTypes.ADD_PARKING_RESERVATION_SPACE_FAILURE);

export const deleteParkingReservationAttempt = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_SPACE_ATTEMPT);
export const deleteParkingReservationSuccess = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_SPACE_SUCCESS);
export const deleteParkingReservationFailure = createAction(ActionTypes.REMOVE_PARKING_RESERVATION_SPACE_FAILURE)
;
export const getParkingReservationSpaceAttempt = createAction(ActionTypes.GET_PARKING_RESERVATION_SPACE_ATTEMPT);
export const getParkingReservationSpaceSuccess = createAction(ActionTypes.GET_PARKING_RESERVATION_SPACE_SUCCESS);
export const getParkingReservationSpaceFailure = createAction(ActionTypes.GET_PARKING_RESERVATION_SPACE_FAILURE);

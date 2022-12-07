import { createAction } from '@ngrx/store';

enum ActionTypes {
  ADD_ROOM_RESERVATION_SPACE_ATTEMPT = '[Room Reservation Space] Add room reservation space attempt',
  ADD_ROOM_RESERVATION_SPACE_SUCCESS = '[Room Reservation Space] Add room reservation space success',
  ADD_ROOM_RESERVATION_SPACE_FAILURE = '[Room Reservation Space] Add room reservation space failure',

  REMOVE_ROOM_RESERVATION_SPACE_ATTEMPT = '[Room Reservation Space] Remove room reservation space attempt',
  REMOVE_ROOM_RESERVATION_SPACE_SUCCESS = '[Room Reservation Space] Remove room reservation space success',
  REMOVE_ROOM_RESERVATION_SPACE_FAILURE = '[Room Reservation Space] Remove room reservation space failure',

  GET_ROOM_RESERVATION_SPACE_ATTEMPT = '[Room Reservation Space] Get room reservation space attempt',
  GET_ROOM_RESERVATION_SPACE_SUCCESS = '[Room Reservation Space] Get room reservation space success',
  GET_ROOM_RESERVATION_SPACE_FAILURE = '[Room Reservation Space] Get room reservation space failure',
}

export const addRoomReservationSpaceAttempt = createAction(ActionTypes.ADD_ROOM_RESERVATION_SPACE_ATTEMPT);
export const addRoomReservationSpaceSuccess = createAction(ActionTypes.ADD_ROOM_RESERVATION_SPACE_SUCCESS);
export const addRoomReservationSpaceFailure = createAction(ActionTypes.ADD_ROOM_RESERVATION_SPACE_FAILURE);

export const deleteRoomReservationAttempt = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_SPACE_ATTEMPT);
export const deleteRoomReservationSuccess = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_SPACE_SUCCESS);
export const deleteRoomReservationFailure = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_SPACE_FAILURE)
;
export const getRoomReservationSpaceAttempt = createAction(ActionTypes.GET_ROOM_RESERVATION_SPACE_ATTEMPT);
export const getRoomReservationSpaceSuccess = createAction(ActionTypes.GET_ROOM_RESERVATION_SPACE_SUCCESS);
export const getRoomReservationSpaceFailure = createAction(ActionTypes.GET_ROOM_RESERVATION_SPACE_FAILURE);

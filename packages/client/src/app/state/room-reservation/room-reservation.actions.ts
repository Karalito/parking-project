import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';
import { RoomReservation } from 'src/app/shared/models/reservations.model';

enum ActionTypes {
  ADD_ROOM_RESERVATION_ATTEMPT = '[Reservation List] Add room reservation attempt',
  ADD_ROOM_RESERVATION_SUCCESS = '[Reservation List/API] Add room reservations success',
  ADD_ROOM_RESERVATION_FAILURE = '[Reservation List/API] Add room reservations failure',

  REMOVE_ROOM_RESERVATION_ATTEMPT = '[Reservation List] Remove room reservation attempt',
  REMOVE_ROOM_RESERVATION_SUCCESS = '[Reservation List/API] Remove room reservations success',
  REMOVE_ROOM_RESERVATION_FAILURE = '[Reservation List/API] Remove room reservations failure',

  GET_ROOM_RESERVATIONS_ATTEMPT = '[Reservation List/API] Get room reservations attempt',
  GET_ROOM_RESERVATIONS_SUCCESS = '[Reservation List/API] Get room reservations success',
  GET_ROOM_RESERVATIONS_FAILURE = '[Reservation List/API] Get room reservations Failure'
}

export const addRoomReservation = createAction(ActionTypes.ADD_ROOM_RESERVATION_ATTEMPT, props<{ userId: string; roomId: string; tableId: string; date: Moment }>());
export const addRoomReservationSuccess = createAction(ActionTypes.ADD_ROOM_RESERVATION_SUCCESS, props<{ roomReservation: RoomReservation }>());
export const addRoomReservationFailure = createAction(ActionTypes.ADD_ROOM_RESERVATION_FAILURE);

export const deleteRoomReservation = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_ATTEMPT, props<{ userId: string }>());
export const deleteRoomReservationSuccess = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_SUCCESS);
export const deleteRoomReservationFailure = createAction(ActionTypes.REMOVE_ROOM_RESERVATION_FAILURE);

export const getRoomReservation = createAction(ActionTypes.GET_ROOM_RESERVATIONS_ATTEMPT, props<{ date: Moment }>());
export const getRoomReservationSuccess = createAction(ActionTypes.GET_ROOM_RESERVATIONS_SUCCESS, props<{ roomReservation: RoomReservation[] }>());
export const getRoomReservationFailure = createAction(ActionTypes.GET_ROOM_RESERVATIONS_FAILURE);

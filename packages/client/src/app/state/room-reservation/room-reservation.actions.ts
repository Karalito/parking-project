import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';
import { RoomReservation } from 'src/app/features/home/models/reservations';

export const addRoomReservation = createAction(
  '[Reservation List] Add room reservation',
  props<{ userId: string; roomId: string; tableId: string; date: Moment }>()
);

export const addRoomReservationSuccess = createAction(
  '[Reservation List/API] Add room reservations success',
  props<{ roomReservation: RoomReservation }>()
);

export const addRoomReservationFailure = createAction('[Reservation List/API] Add room reservations failure');

export const deleteRoomReservation = createAction(
  '[Reservation List] Remove room reservation',
  props<{ userId: string }>()
);

export const deleteRoomReservationSuccess = createAction('[Reservation List/API] Remove room reservations success');

export const deleteRoomReservationFailure = createAction('[Reservation List/API] Remove room reservations failure');

export const getRoomReservation = createAction(
  '[Reservation List/API] Get room reservations',
  props<{ date: Moment }>()
);

export const getRoomReservationSuccess = createAction(
  '[Reservation List/API] Get room reservations success',
  props<{ roomReservation: RoomReservation[] }>()
);

export const getRoomReservationFailure = createAction('[Reservation List/API] Get room reservations Failure');

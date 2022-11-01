import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RoomReservationState } from './room-reservation.reducer';

export const getRoomReservationState = createFeatureSelector<RoomReservationState>('roomReservation');

export const selectRoomReservation = createSelector(
  getRoomReservationState,
  (state: RoomReservationState) => state.roomReservation
);

export const selectIsLoading = createSelector(
  getRoomReservationState,
  (state: RoomReservationState) => state.isLoading
);

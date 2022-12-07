import { createReducer, on } from '@ngrx/store';
import { RoomReservation } from 'src/app/shared/models/reservations.model';
import { getRoomReservation, getRoomReservationSuccess, getRoomReservationFailure } from './room-reservation.actions';
export interface RoomReservationState {
  roomReservation: RoomReservation[];
  isLoading: boolean;
}

export const initialState: RoomReservationState = {
  isLoading: false,
  roomReservation: []
};

export const roomReservationReducer = createReducer(
  initialState,
  on(getRoomReservation, (state) => ({
    ...state,
    isLoading: true
  })),

  on(getRoomReservationSuccess, (state, { roomReservation }) => ({
    ...state,
    roomReservation,
    isLoading: false
  })),

  on(getRoomReservationFailure, (state) => ({
    ...state,
    roomReservation: [],
    isLoading: false
  }))
);

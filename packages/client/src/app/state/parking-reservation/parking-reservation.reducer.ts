import { createReducer, on } from '@ngrx/store';
import { ParkingReservation } from 'src/app/shared/models/reservations';
import {
  getParkingReservation,
  getParkingReservationSuccess,
  getParkingReservationFailure,
} from './parking-reservation.actions';
export interface ParkingReservationState {
  parkingReservation: ParkingReservation[];
  isLoading: boolean;
}

export const initialState: ParkingReservationState = {
  isLoading: false,
  parkingReservation: []
};

export const parkingReservationReducer = createReducer(
  initialState,
  on(getParkingReservation, (state) => ({
    ...state,
    isLoading: true
  })),

  on(getParkingReservationSuccess, (state, { parkingReservation }) => ({
    ...state,
    parkingReservation,
    isLoading: false
  })),

  on(getParkingReservationFailure, (state) => ({
    ...state,
    parkingReservation: [],
    isLoading: false
  }))
);

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ParkingReservationState } from './parking-reservation.reducer';


export const getParkingReservationState = createFeatureSelector<ParkingReservationState>('parkingReservation');

export const selectParkingReservation = createSelector(
  getParkingReservationState,
  (state: ParkingReservationState) => state.parkingReservation
);

export const selectIsLoading = createSelector(
  getParkingReservationState,
  (state: ParkingReservationState) => state.isLoading
);

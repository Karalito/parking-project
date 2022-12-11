import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParkingSpaceState } from './parking-space.reducer';

export const getParkingSpaceState = createFeatureSelector<ParkingSpaceState>('parkingSpace');
export const selectParkingSpaceList = createSelector(getParkingSpaceState, (state: ParkingSpaceState) => state.parkingSpaceList);

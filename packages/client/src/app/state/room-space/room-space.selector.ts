import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomSpaceState } from './room-space.reducer';

export const getRoomSpaceState = createFeatureSelector<RoomSpaceState>('roomSpace');
export const selectRoomSpaceList = createSelector(getRoomSpaceState, (state: RoomSpaceState) => state.roomSpaceList);

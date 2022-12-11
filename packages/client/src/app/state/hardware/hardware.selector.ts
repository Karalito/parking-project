import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HardwareState } from './hardware.reducer';

export const getHardwareState = createFeatureSelector<HardwareState>('hardware');
export const selectHardwareList = createSelector(getHardwareState, (state: HardwareState) => state.hardwareList);

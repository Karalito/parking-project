import IError from '../../shared/interfaces/error-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addParkingSpaceAttempt,
  addParkingSpaceFailure,
  addParkingSpaceSuccess,
  deleteParkingSpaceAttempt, deleteParkingSpaceFailure,
  deleteParkingSpaceSuccess,
  getParkingSpaceListAttempt, getParkingSpaceListFailure,
  getParkingSpaceListSuccess
} from './parking-space.actions';
import { ParkingSpace } from '../../shared/models/parking-space.model';

export interface ParkingSpaceState {
  parkingSpaceList: ParkingSpace[];
  parkingSpace: ParkingSpace;
  isLoading: boolean;
  error: IError;
}

export const initialState: ParkingSpaceState = {
  isLoading: false,
  parkingSpaceList: [],
  parkingSpace: null,
  error: null
};

export const parkingSpaceReducer = createReducer(
    initialState,

    on(getParkingSpaceListAttempt, (state) => ({
      ...state,
      isLoading: true,
      parkingSpaceList: null,
      parkingSpace: null,
      error: null
    })),
    on(getParkingSpaceListSuccess, (state, action) => ({
      ...state,
      parkingSpaceList: action.parkingSpaceList,
      isLoading: false,
      error: null
    })),
    on(getParkingSpaceListFailure, (state, action) => ({
      ...state,
      parkingSpaceList: [],
      parkingSpace: null,
      isLoading: false,
      error: action.error
    })),

    on(addParkingSpaceAttempt, (state) => ({
      ...state,
      parkingSpace: null,
      isLoading: true,
      error: null
    })),
    on(addParkingSpaceSuccess, (state, action) => ({
      ...state,
      parkingSpace: action.parkingSpace,
      isLoading: false,
      error: null
    })),
    on(addParkingSpaceFailure, (state, action) => ({
      ...state,
      parkingSpace: null,
      isLoading: false,
      error: action.error
    })),

    on(deleteParkingSpaceAttempt, (state) => ({
      ...state,
      isLoading: true,
      parkingSpace: null,
      error: null
    })),
    on(deleteParkingSpaceSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      parkingSpace: action.parkingSpace,
      error: null
    })),
    on(deleteParkingSpaceFailure, (state, action) => ({
      ...state,
      isLoading: false,
      parkingSpace: null,
      error: action.error
    }))
  )
;

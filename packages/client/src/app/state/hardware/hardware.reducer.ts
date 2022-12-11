import { Hardware } from '../../shared/models/hardware.model';
import IError from '../../shared/interfaces/error-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addHardwareAttempt,
  addHardwareFailure,
  addHardwareSuccess,
  deleteHardwareAttempt,
  deleteHardwareFailure,
  deleteHardwareSuccess,
  getHardwareListAttempt,
  getHardwareListFailure,
  getHardwareListSuccess
} from './hardware.actions';
import { state } from '@angular/animations';


export interface HardwareState {
  hardwareList: Hardware[];
  hardware: Hardware;
  isLoading: boolean;
  error: IError;
}

export const initialState: HardwareState = {
  isLoading: false,
  hardwareList: [],
  hardware: null,
  error: undefined
};

export const hardwareReducer = createReducer(
  initialState,

  on(getHardwareListAttempt, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getHardwareListSuccess, (state, action) => ({
    ...state,
    hardwareList: action.hardwareList,
    isLoading: false
  })),
  on(getHardwareListFailure, (state, action) => ({
    ...state,
    hardwareList: [],
    isLoading: false,
    error: action.error
  })),

  on(addHardwareAttempt, (state) => ({
    ...state,
    hardware: null,
    isLoading: true,
    error: null
  })),
  on(addHardwareSuccess, (state, action) => ({
    ...state,
    hardware: action.hardware,
    isLoading: false,
    error: null
  })),
  on(addHardwareFailure, (state, action) => ({
    ...state,
    hardware: null,
    isLoading: false,
    error: action.error
  })),

  on(deleteHardwareAttempt, (state) => ({
    ...state,
    isLoading: true
  })),
  on(deleteHardwareSuccess, (state, action) => ({
    ...state,
    hardware: action.hardware,
    isLoading: false
  })),
  on(deleteHardwareFailure, (state, action) => ({
    ...state,
    hardware: null,
    isLoading: false,
    error: action.error
  }))
);

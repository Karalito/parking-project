import { createAction } from '@ngrx/store';

enum ActionTypes {
  ADD_HARDWARE_ATTEMPT = '[Hardware data] Add hardware attempt',
  ADD_HARDWARE_SUCCESS = '[Hardware data] Add hardware success',
  ADD_HARDWARE_FAILURE = '[Hardware data] Add hardware failure',

  REMOVE_HARDWARE_ATTEMPT = '[Hardware data] Remove hardware attempt',
  REMOVE_HARDWARE_SUCCESS = '[Hardware data] Remove hardware success',
  REMOVE_HARDWARE_FAILURE = '[Hardware data] Remove hardware failure',

  GET_HARDWARE_ATTEMPT = '[Hardware data] Get hardware attempt',
  GET_HARDWARE_SUCCESS = '[Hardware data] Get hardware success',
  GET_HARDWARE_FAILURE = '[Hardware data] Get hardware failure'
}

export const addHardwareAttempt = createAction(ActionTypes.ADD_HARDWARE_ATTEMPT);
export const addHardwareSuccess = createAction(ActionTypes.ADD_HARDWARE_SUCCESS);
export const addHardwareFailure = createAction(ActionTypes.ADD_HARDWARE_FAILURE);

export const deleteHardwareAttempt = createAction(ActionTypes.REMOVE_HARDWARE_ATTEMPT);
export const deleteHardwareSuccess = createAction(ActionTypes.REMOVE_HARDWARE_SUCCESS);
export const deleteHardwareFailure = createAction(ActionTypes.REMOVE_HARDWARE_FAILURE);

export const getHardwareAttempt = createAction(ActionTypes.GET_HARDWARE_ATTEMPT);
export const getHardwareSuccess = createAction(ActionTypes.GET_HARDWARE_SUCCESS);
export const getHardwareFailure = createAction(ActionTypes.GET_HARDWARE_FAILURE);

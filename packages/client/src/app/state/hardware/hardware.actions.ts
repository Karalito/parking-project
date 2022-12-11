import { createAction, props } from '@ngrx/store';
import { Hardware } from '../../shared/models/hardware.model';
import IError from '../../shared/interfaces/error-state.interface';

enum ActionTypes {
  ADD_HARDWARE_ATTEMPT = '[Hardware data] Add hardware attempt',
  ADD_HARDWARE_SUCCESS = '[Hardware data] Add hardware success',
  ADD_HARDWARE_FAILURE = '[Hardware data] Add hardware failure',

  REMOVE_HARDWARE_ATTEMPT = '[Hardware data] Remove hardware attempt',
  REMOVE_HARDWARE_SUCCESS = '[Hardware data] Remove hardware success',
  REMOVE_HARDWARE_FAILURE = '[Hardware data] Remove hardware failure',

  GET_HARDWARE_ATTEMPT = '[Hardware data] Get hardware attempt',
  GET_HARDWARE_SUCCESS = '[Hardware data] Get hardware success',
  GET_HARDWARE_FAILURE = '[Hardware data] Get hardware failure',

  GET_HARDWARE_LIST_ATTEMPT = '[Hardware data] Get hardware list attempt',
  GET_HARDWARE_LIST_SUCCESS = '[Hardware data] Get hardware list success',
  GET_HARDWARE_LIST_FAILURE = '[Hardware data] Get hardware list failure'
}

export const addHardwareAttempt = createAction(ActionTypes.ADD_HARDWARE_ATTEMPT, props<{hardware: Hardware}>());
export const addHardwareSuccess = createAction(ActionTypes.ADD_HARDWARE_SUCCESS, props<{hardware: Hardware}>());
export const addHardwareFailure = createAction(ActionTypes.ADD_HARDWARE_FAILURE, props<{error: IError}>());

export const deleteHardwareAttempt = createAction(ActionTypes.REMOVE_HARDWARE_ATTEMPT, props<{hardwareId: string}>());
export const deleteHardwareSuccess = createAction(ActionTypes.REMOVE_HARDWARE_SUCCESS, props<{hardware: Hardware}>());
export const deleteHardwareFailure = createAction(ActionTypes.REMOVE_HARDWARE_FAILURE, props<{error: IError}>());

export const getHardwareAttempt = createAction(ActionTypes.GET_HARDWARE_ATTEMPT);
export const getHardwareSuccess = createAction(ActionTypes.GET_HARDWARE_SUCCESS);
export const getHardwareFailure = createAction(ActionTypes.GET_HARDWARE_FAILURE);

export const getHardwareListAttempt = createAction(ActionTypes.GET_HARDWARE_LIST_ATTEMPT);
export const getHardwareListSuccess = createAction(ActionTypes.GET_HARDWARE_LIST_SUCCESS, props<{ hardwareList: Hardware[] }>());
export const getHardwareListFailure = createAction(ActionTypes.GET_HARDWARE_LIST_FAILURE, props<{ error: IError }>());

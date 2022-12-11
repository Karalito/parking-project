import { createAction, props } from '@ngrx/store';
import { ParkingReservationSpace } from '../../shared/models/reservation-place.model';
import { IError } from 'protractor/built/exitCodes';
import { ParkingSpace } from '../../shared/models/parking-space.model';

enum ActionTypes {
  ADD_PARKING_SPACE_ATTEMPT = '[Parking Space] Add parking space attempt',
  ADD_PARKING_SPACE_SUCCESS = '[Parking Space] Add parking space success',
  ADD_PARKING_SPACE_FAILURE = '[Parking Space] Add parking space failure',

  REMOVE_PARKING_SPACE_ATTEMPT = '[Parking Space] Remove parking space attempt',
  REMOVE_PARKING_SPACE_SUCCESS = '[Parking Space] Remove parking space success',
  REMOVE_PARKING_SPACE_FAILURE = '[Parking Space] Remove parking space failure',

  GET_PARKING_SPACE_ATTEMPT = '[Parking Space] Get parking space attempt',
  GET_PARKING_SPACE_SUCCESS = '[Parking Space] Get parking space success',
  GET_PARKING_SPACE_FAILURE = '[Parking Space] Get parking space failure',

  GET_PARKING_SPACE_LIST_ATTEMPT = '[Parking Space] Get parking space list attempt',
  GET_PARKING_SPACE_LIST_SUCCESS = '[Parking Space] Get parking space list success',
  GET_PARKING_SPACE_LIST_FAILURE = '[Parking Space] Get parking space list failure'
}

export const addParkingSpaceAttempt = createAction(ActionTypes.ADD_PARKING_SPACE_ATTEMPT, props<{ parkingSpace: ParkingSpace }>());
export const addParkingSpaceSuccess = createAction(ActionTypes.ADD_PARKING_SPACE_SUCCESS, props<{ parkingSpace: ParkingSpace }>());
export const addParkingSpaceFailure = createAction(ActionTypes.ADD_PARKING_SPACE_FAILURE, props<{ error: IError }>());

export const deleteParkingSpaceAttempt = createAction(ActionTypes.REMOVE_PARKING_SPACE_ATTEMPT, props<{ parkingSpaceId: string }>());
export const deleteParkingSpaceSuccess = createAction(ActionTypes.REMOVE_PARKING_SPACE_SUCCESS, props<{ parkingSpace: ParkingSpace }>());
export const deleteParkingSpaceFailure = createAction(ActionTypes.REMOVE_PARKING_SPACE_FAILURE, props<{ error: IError }>());
export const getParkingSpaceAttempt = createAction(ActionTypes.GET_PARKING_SPACE_ATTEMPT);
export const getParkingSpaceSuccess = createAction(ActionTypes.GET_PARKING_SPACE_SUCCESS);
export const getParkingSpaceFailure = createAction(ActionTypes.GET_PARKING_SPACE_FAILURE);

export const getParkingSpaceListAttempt = createAction(ActionTypes.GET_PARKING_SPACE_LIST_ATTEMPT);
export const getParkingSpaceListSuccess = createAction(ActionTypes.GET_PARKING_SPACE_LIST_SUCCESS, props<{ parkingSpaceList: ParkingSpace[] }>());
export const getParkingSpaceListFailure = createAction(ActionTypes.GET_PARKING_SPACE_LIST_FAILURE, props<{ error: IError }>());

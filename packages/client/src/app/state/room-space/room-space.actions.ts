import { createAction, props } from '@ngrx/store';
import { IError } from 'protractor/built/exitCodes';
import { RoomSpace } from '../../shared/models/room-space.model';

enum ActionTypes {
  ADD_ROOM_SPACE_ATTEMPT = '[Room Space] Add room space attempt',
  ADD_ROOM_SPACE_SUCCESS = '[Room Space] Add room space success',
  ADD_ROOM_SPACE_FAILURE = '[Room Space] Add room space failure',

  REMOVE_ROOM_SPACE_ATTEMPT = '[Room Space] Remove room space attempt',
  REMOVE_ROOM_SPACE_SUCCESS = '[Room Space] Remove room space success',
  REMOVE_ROOM_SPACE_FAILURE = '[Room Space] Remove room space failure',

  GET_ROOM_SPACE_ATTEMPT = '[Room Space] Get room space attempt',
  GET_ROOM_SPACE_SUCCESS = '[Room Space] Get room space success',
  GET_ROOM_SPACE_FAILURE = '[Room Space] Get room space failure',

  GET_ROOM_SPACE_LIST_ATTEMPT = '[Room Space] Get room space list attempt',
  GET_ROOM_SPACE_LIST_SUCCESS = '[Room Space] Get room space list success',
  GET_ROOM_SPACE_LIST_FAILURE = '[Room Space] Get room space list failure'

}

export const addRoomSpaceAttempt = createAction(ActionTypes.ADD_ROOM_SPACE_ATTEMPT, props<{ roomSpace: RoomSpace }>());
export const addRoomSpaceSuccess = createAction(ActionTypes.ADD_ROOM_SPACE_SUCCESS, props<{ roomSpace: RoomSpace }>());
export const addRoomSpaceFailure = createAction(ActionTypes.ADD_ROOM_SPACE_FAILURE, props<{ error: IError }>());

export const deleteRoomSpaceAttempt = createAction(ActionTypes.REMOVE_ROOM_SPACE_ATTEMPT, props<{ roomSpaceId: string }>());
export const deleteRoomSpaceSuccess = createAction(ActionTypes.REMOVE_ROOM_SPACE_SUCCESS, props<{ roomSpace: RoomSpace }>());
export const deleteRoomSpaceFailure = createAction(ActionTypes.REMOVE_ROOM_SPACE_FAILURE, props<{ error: IError }>())
;
export const getRoomSpaceAttempt = createAction(ActionTypes.GET_ROOM_SPACE_ATTEMPT);
export const getRoomSpaceSuccess = createAction(ActionTypes.GET_ROOM_SPACE_SUCCESS);
export const getRoomSpaceFailure = createAction(ActionTypes.GET_ROOM_SPACE_FAILURE);

export const getRoomSpaceListAttempt = createAction(ActionTypes.GET_ROOM_SPACE_LIST_ATTEMPT);
export const getRoomSpaceListSuccess = createAction(ActionTypes.GET_ROOM_SPACE_LIST_SUCCESS, props<{ roomSpaceList: RoomSpace[] }>());
export const getRoomSpaceListFailure = createAction(ActionTypes.GET_ROOM_SPACE_LIST_FAILURE, props<{ error: IError }>());

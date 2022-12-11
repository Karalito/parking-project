import IError from '../../shared/interfaces/error-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addRoomSpaceAttempt,
  addRoomSpaceFailure,
  addRoomSpaceSuccess,
  deleteRoomSpaceAttempt,
  deleteRoomSpaceFailure,
  deleteRoomSpaceSuccess,
  getRoomSpaceListAttempt,
  getRoomSpaceListFailure,
  getRoomSpaceListSuccess
} from './room-space.actions';
import { RoomSpace } from '../../shared/models/room-space.model';


export interface RoomSpaceState {
  roomSpaceList: RoomSpace[];
  roomSpace: RoomSpace;
  isLoading: boolean;
  error: IError;
}

export const initialState: RoomSpaceState = {
  isLoading: false,
  roomSpaceList: [],
  roomSpace: null,
  error: null
};

export const roomSpaceReducer = createReducer(
  initialState,

  on(getRoomSpaceListAttempt, (state) => ({
    ...state,
    isLoading: true,
    roomSpaceList: null,
    roomSpace: null,
    error: null
  })),
  on(getRoomSpaceListSuccess, (state, action) => ({
    ...state,
    roomSpaceList: action.roomSpaceList,
    isLoading: false,
    error: null
  })),
  on(getRoomSpaceListFailure, (state, action) => ({
    ...state,
    roomSpaceList: null,
    isLoading: false,
    error: action.error
  })),

  on(addRoomSpaceAttempt, (state) => ({
    ...state,
    isLoading: true,
    roomSpace: null,
    error: null
  })),
  on(addRoomSpaceSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    roomSpace: action.roomSpace,
    error: null
  })),
  on(addRoomSpaceFailure, (state, action) => ({
    ...state,
    isLoading: false,
    roomSpace: null,
    error: action.error
  })),

  on(deleteRoomSpaceAttempt, (state) => ({
    ...state,
    isLoading: true,
    roomSpace: null,
    error: null
  })),
  on(deleteRoomSpaceSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    roomSpace: action.roomSpace,
    error: null
  })),
  on(deleteRoomSpaceFailure, (state, action) => ({
    ...state,
    isLoading: false,
    roomSpace: null,
    error: action.error
  }))
);

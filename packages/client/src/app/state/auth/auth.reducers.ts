import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import {
  getUserAttempt,
  getUserFailure,
  getUserListAttempt,
  getUserListFailure,
  getUserListSuccess,
  getUserSuccess, updateUserAttempt, updateUserFailure, updateUserSuccess
} from './auth.actions';
import IError from '../../shared/interfaces/error-state.interface';

export interface AuthState {
  user: User;
  userList: User[];
  updatedUser: User;
  isLoading: boolean;
  error: IError;
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
  userList: null,
  updatedUser: null,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(getUserAttempt, (state) => ({
    ...state,
    user: null,
    isLoading: true,
    error: null
  })),

  on(getUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoading: false,
    error: null
  })),

  on(getUserFailure, (state, action) => ({
    ...state,
    user: null,
    isLoading: false,
    error: action.error
  })),

  on(getUserListAttempt, (state) => ({
    ...state,
    userList: null,
    isLoading: true,
    error: null
  })),

  on(getUserListSuccess, (state, action) => ({
    ...state,
    userList: action.userList,
    isLoading: false,
    error: null
  })),

  on(getUserListFailure, (state, action) => ({
    ...state,
    userList: null,
    isLoading: false,
    error: action.error
  })),

  on(updateUserAttempt, (state) => ({
    ...state,
    updatedUser: null,
    isLoading: true,
    error: null
  })),

  on(updateUserSuccess, (state, action) => ({
    ...state,
    updatedUser: action.updatedUser,
    isLoading: false,
    error: null
  })),

  on(updateUserFailure, (state, action) => ({
    ...state,
    updatedUser: null,
    isLoading: false,
    error: action.error
  }))
);

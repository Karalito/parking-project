import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { getUserAttempt, getUserFailure, getUserSuccess } from './auth.actions';
import IError from '../../shared/interfaces/error-state.interface';

export interface AuthState {
  user: User;
  isLoading: boolean;
  error: IError;
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
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
  }))
);

import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import IError from '../../shared/interfaces/error-state.interface';
export enum ActionTypes {
  LOGOUT_ATTEMPT = '[Auth] Logout attempt',
  LOGOUT_SUCCESS = '[Auth] Logout success',
  LOGOUT_FAILURE = '[Auth] Logout failure',

  GET_USER_ATTEMPT = '[Auth] Get user attempt',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_FAILURE = '[Auth] Get user failure'
}

export const logoutAttempt = createAction(ActionTypes.LOGOUT_ATTEMPT);
export const logoutSuccess = createAction(ActionTypes.LOGOUT_SUCCESS, props<{ user: null }>());
export const logoutFailure = createAction(ActionTypes.LOGOUT_FAILURE, props<{ error: IError }>());

export const getUserAttempt = createAction(ActionTypes.GET_USER_ATTEMPT);
export const getUserSuccess = createAction(ActionTypes.GET_USER_SUCCESS, props<{ user: User }>());
export const getUserFailure = createAction(ActionTypes.GET_USER_FAILURE, props<{ error: IError }>());

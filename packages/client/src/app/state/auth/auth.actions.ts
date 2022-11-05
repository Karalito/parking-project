import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import IError from '../../shared/interfaces/error-state.interface';

enum ActionTypes {
  GET_USER_ATTEMPT = '[Auth] Get user attempt',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_FAILURE = '[Auth] Get user failure',

  GET_USER_LIST_ATTEMPT = '[Auth] Get user list attempt',
  GET_USER_LIST_SUCCESS = '[Auth] Get user list success',
  GET_USER_LIST_FAILURE = '[Auth] Get user list failure',

  UPDATE_USER_ATTEMPT = '[Auth] Update user attempt',
  UPDATE_USER_SUCCESS = '[Auth] Update user success',
  UPDATE_USER_FAILURE = '[Auth] Update user failure'
}

export const getUserAttempt = createAction(ActionTypes.GET_USER_ATTEMPT);
export const getUserSuccess = createAction(ActionTypes.GET_USER_SUCCESS, props<{ user: User }>());
export const getUserFailure = createAction(ActionTypes.GET_USER_FAILURE, props<{ error: IError }>());

export const getUserListAttempt = createAction(ActionTypes.GET_USER_LIST_ATTEMPT);
export const getUserListSuccess = createAction(ActionTypes.GET_USER_LIST_SUCCESS, props<{ userList: User[] }>());
export const getUserListFailure = createAction(ActionTypes.GET_USER_LIST_FAILURE, props<{ error: IError }>());

export const updateUserAttempt = createAction(ActionTypes.UPDATE_USER_ATTEMPT, props<{ user: User }>());
export const updateUserSuccess = createAction(ActionTypes.UPDATE_USER_SUCCESS, props<{ updatedUser: User }>());
export const updateUserFailure = createAction(ActionTypes.UPDATE_USER_FAILURE, props<{ error: IError }>());

import { createAction, props } from '@ngrx/store';
import { Table } from '../../shared/models/table.model';
import { IError } from 'protractor/built/exitCodes';

enum ActionTypes {
  ADD_TABLE_ATTEMPT = '[Table data] Add table attempt',
  ADD_TABLE_SUCCESS = '[Table data] Add table success',
  ADD_TABLE_FAILURE = '[Table data] Add table failure',

  REMOVE_TABLE_ATTEMPT = '[Table data] Remove table attempt',
  REMOVE_TABLE_SUCCESS = '[Table data] Remove table success',
  REMOVE_TABLE_FAILURE = '[Table data] Remove table failure',

  GET_TABLE_ATTEMPT = '[Table data] Get table attempt',
  GET_TABLE_SUCCESS = '[Table data] Get table success',
  GET_TABLE_FAILURE = '[Table data] Get table failure',

  GET_TABLE_LIST_ATTEMPT = '[Table data] Get table list attempt',
  GET_TABLE_LIST_SUCCESS = '[Table data] Get table list success',
  GET_TABLE_LIST_FAILURE = '[Table data] Get table list failure'
}

export const addTableAttempt = createAction(ActionTypes.ADD_TABLE_ATTEMPT, props<{ table: Table }>());
export const addTableSuccess = createAction(ActionTypes.ADD_TABLE_SUCCESS, props<{ table: Table }>());
export const addTableFailure = createAction(ActionTypes.ADD_TABLE_FAILURE, props<{ error: IError }>());

export const deleteTableAttempt = createAction(ActionTypes.REMOVE_TABLE_ATTEMPT, props<{ tableId: string }>());
export const deleteTableSuccess = createAction(ActionTypes.REMOVE_TABLE_SUCCESS);
export const deleteTableFailure = createAction(ActionTypes.REMOVE_TABLE_FAILURE, props<{ error: IError }>());

export const getTableAttempt = createAction(ActionTypes.GET_TABLE_ATTEMPT);
export const getTableSuccess = createAction(ActionTypes.GET_TABLE_SUCCESS, props<{ table: Table }>());
export const getTableFailure = createAction(ActionTypes.GET_TABLE_FAILURE, props<{ error: IError }>());

export const getTableListAttempt = createAction(ActionTypes.GET_TABLE_LIST_ATTEMPT);
export const getTableListSuccess = createAction(ActionTypes.GET_TABLE_LIST_SUCCESS, props<{ tableList: Table[] }>());
export const getTableListFailure = createAction(ActionTypes.GET_TABLE_LIST_FAILURE, props<{ error: IError }>());

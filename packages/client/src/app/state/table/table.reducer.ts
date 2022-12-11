import { Table } from '../../shared/models/table.model';
import IError from '../../shared/interfaces/error-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addTableAttempt, addTableFailure,
  addTableSuccess, deleteTableAttempt, deleteTableFailure, deleteTableSuccess,
  getTableAttempt,
  getTableFailure,
  getTableListAttempt,
  getTableListFailure,
  getTableListSuccess,
  getTableSuccess
} from './table.actions';

export interface TableState {
  tableList: Table[];
  table: Table;
  isLoading: boolean;
  error: IError;
}

export const initialState: TableState = {
  isLoading: false,
  tableList: [],
  table: null,
  error: null
};

export const tableReducer = createReducer(
  initialState,

  on(getTableAttempt, (state) => ({
    ...state,
    isLoading: true
  })),
  on(getTableSuccess, (state, action) => ({
    ...state,
    table: action.table,
    isLoading: false
  })),
  on(getTableFailure, (state, action) => ({
    ...state,
    table: null,
    isLoading: false,
    error: action.error
  })),

  on(getTableListAttempt, (state) => ({
    ...state,
    isLoading: true,
    tableList: null,
    table: null,
    error: null
  })),
  on(getTableListSuccess, (state, action) => ({
    ...state,
    tableList: action.tableList,
    isLoading: false,
    error: null
  })),
  on(getTableListFailure, (state, action) => ({
    ...state,
    tableList: null,
    table: null,
    isLoading: false,
    error: action.error
  })),

  on(addTableAttempt, (state, action) => ({
    ...state,
    table: action.table,
    isLoading: true
  })),
  on(addTableSuccess, (state, action) => ({
    ...state,
    table: action.table,
    isLoading: false
  })),
  on(addTableFailure, (state, action) => ({
    ...state,
    table: null,
    isLoading: false,
    error: action.error
  })),

  on(deleteTableAttempt, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(deleteTableSuccess, (state, action) => ({
    ...state,
    table: null,
    isLoading: false
  })),
  on(deleteTableFailure, (state, action) => ({
    ...state,
    table: null,
    isLoading: false,
    error: action.error
  }))
);

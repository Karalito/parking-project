import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableState } from './table.reducer';

export const getTableState = createFeatureSelector<TableState>('table');
export const selectTableList = createSelector(getTableState, (state: TableState) => state.tableList);

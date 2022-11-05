import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(getAuthState, (state: AuthState) => state.user);
export const selectUserList = createSelector(getAuthState, (state: AuthState) => state.userList);

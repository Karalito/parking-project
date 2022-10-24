import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(getAuthState, (state: AuthState) => state.user);

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../features/auth/services/auth.service';
import {
  getUserAttempt,
  getUserFailure,
  getUserListAttempt,
  getUserListFailure,
  getUserListSuccess,
  getUserSuccess
} from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
  }

  getUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAttempt),
      switchMap((_) => {
        return this.authService.getUser().pipe(
          map((user: User) => getUserSuccess({ user })),
          catchError((error) => of(getUserFailure(error)))
        );
      })
    )
  );

  getUserList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserListAttempt),
      switchMap((_) => {
        return this.authService.getUserList().pipe(
          map((userList: User[]) => getUserListSuccess({ userList })),
          catchError((error) => of(getUserListFailure))
        );
      })
    )
  );
}

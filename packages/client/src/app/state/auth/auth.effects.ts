import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../features/auth/services/auth.service';
import { getUserAttempt, getUserFailure, getUserSuccess } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

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
}

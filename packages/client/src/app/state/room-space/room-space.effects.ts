import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../features/admin/admin.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  addRoomSpaceAttempt,
  addRoomSpaceFailure,
  addRoomSpaceSuccess,
  deleteRoomSpaceAttempt,
  deleteRoomSpaceFailure,
  deleteRoomSpaceSuccess,
  getRoomSpaceListAttempt,
  getRoomSpaceListFailure,
  getRoomSpaceListSuccess
} from './room-space.actions';
import { RoomSpace } from '../../shared/models/room-space.model';
import { NotificationService } from '../../shared/services/notifications/notification.service';

@Injectable()
export class RoomSpaceEffects {

  getRoomSpaceList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getRoomSpaceListAttempt),
      switchMap((_) => {
        return this.adminService.getRoomSpaces().pipe(
          map((roomSpaceList: RoomSpace[]) => {
            return getRoomSpaceListSuccess({ roomSpaceList });
          }),
          catchError((error) => of(getRoomSpaceListFailure(error)))
        );
      })
    ));

  addRoomSpace$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoomSpaceAttempt),
      switchMap((payload) => {
        return this.adminService.addRoomSpace(payload.roomSpace).pipe(
          map((roomSpace: RoomSpace) => {
            this.notificationService.showSuccessCreated('Room Space');
            return addRoomSpaceSuccess({ roomSpace });
          }),
          catchError((error) => {
            this.notificationService.showFailureCreated(error.error.message);
            return of(addRoomSpaceFailure(error));
          })
        );
      })
    ));

  deleteRoomSpace$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRoomSpaceAttempt),
      switchMap((payload) => {
        return this.adminService.deleteRoomSpace(payload.roomSpaceId).pipe(
          map((roomSpace: RoomSpace) => {
            this.notificationService.showDeleted();
            return deleteRoomSpaceSuccess({ roomSpace });
          }),
          catchError((error) => {
            this.notificationService.showFailureDelete(error.error.message);
            return of(deleteRoomSpaceFailure(error));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService) {
  }
}

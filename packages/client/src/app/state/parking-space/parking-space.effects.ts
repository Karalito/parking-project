import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../features/admin/admin.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  addParkingSpaceAttempt,
  addParkingSpaceFailure,
  addParkingSpaceSuccess,
  deleteParkingSpaceAttempt, deleteParkingSpaceFailure,
  deleteParkingSpaceSuccess,
  getParkingSpaceListAttempt,
  getParkingSpaceListFailure,
  getParkingSpaceListSuccess
} from './parking-space.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ParkingSpace } from '../../shared/models/parking-space.model';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Injectable()
export class ParkingSpaceEffects {

  getParkingSpaceList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getParkingSpaceListAttempt),
      switchMap((_) => {
        return this.adminService.getParkingSpaces().pipe(
          map((parkingSpaceList: ParkingSpace[]) => getParkingSpaceListSuccess({ parkingSpaceList })),
          catchError((error) => of(getParkingSpaceListFailure(error)))
        );
      })
    ));

  addParkingSpace$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addParkingSpaceAttempt),
      switchMap((payload) => {
        return this.adminService.addParkingSpace(payload.parkingSpace).pipe(
          map((parkingSpace: ParkingSpace) => {
            this.notificationService.showSuccessCreated('Parking Space');
            return addParkingSpaceSuccess({ parkingSpace });
          }),
          catchError((error) => {
            this.notificationService.showFailureCreated(error.message);
            return of(addParkingSpaceFailure(error));
          })
        );
      })
    ));

  deleteParkingSpace$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteParkingSpaceAttempt),
      switchMap((payload) => {
        return this.adminService.deleteParkingSpace(payload.parkingSpaceId).pipe(
          map((parkingSpace: ParkingSpace) => {
            this.notificationService.showDeleted();
            return deleteParkingSpaceSuccess({ parkingSpace });
          }),
          catchError((error) => {
            this.notificationService.showFailureDelete(error.message);
            return of(deleteParkingSpaceFailure(error));
          })
        );
      })
    ));

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService) {
  }
}

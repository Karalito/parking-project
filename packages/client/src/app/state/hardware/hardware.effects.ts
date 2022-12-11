import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  addHardwareAttempt,
  addHardwareFailure,
  addHardwareSuccess,
  deleteHardwareAttempt,
  deleteHardwareFailure,
  deleteHardwareSuccess,
  getHardwareListAttempt,
  getHardwareListFailure,
  getHardwareListSuccess
} from './hardware.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Hardware } from '../../shared/models/hardware.model';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Injectable()
export class HardwareEffects {

  getHardwareList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getHardwareListAttempt),
      switchMap((_) => {
        return this.adminService.getHardware().pipe(
          map((hardwareList: Hardware[]) => getHardwareListSuccess({ hardwareList })),
          catchError((error) => of(getHardwareListFailure(error)))
        );
      })
    ));

  addHardware$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addHardwareAttempt),
      switchMap((payload) => {
        return this.adminService.addHardware(payload.hardware).pipe(
          map((hardware: Hardware) => {
              this.notificationService.showSuccessCreated('Hardware');
              return addHardwareSuccess({ hardware });
            }
          ),
          catchError((error) => {
            this.notificationService.showFailureCreated(error.error.message);
            return of(addHardwareFailure(error));
          })
        );
      })
    ));

  deleteHardware$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHardwareAttempt),
      switchMap((payload) => {
        return this.adminService.deleteHardware(payload.hardwareId).pipe(
          map((hardware: Hardware) => {
            this.notificationService.showDeleted();
            return deleteHardwareSuccess({ hardware });
          }),
          catchError((error) => {
            this.notificationService.showFailureDelete(error.error.message);
            return of(deleteHardwareFailure(error));
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

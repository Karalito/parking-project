import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../features/admin/admin.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  addTableAttempt, addTableFailure, addTableSuccess, deleteTableAttempt, deleteTableFailure, deleteTableSuccess,
  getTableListAttempt,
  getTableListFailure,
  getTableListSuccess,
} from './table.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Table } from '../../shared/models/table.model';
import { NotificationService } from '../../shared/services/notifications/notification.service';

@Injectable()
export class TableEffects {
  getTableList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getTableListAttempt),
      switchMap((_) => {
        return this.adminService.getTables().pipe(
          map((tableList: Table[]) => getTableListSuccess({ tableList })),
          catchError((error) => of(getTableListFailure(error)))
        );
      })
    ));

  addTable$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addTableAttempt),
      switchMap((payload) => {
        return this.adminService.addTable(payload.table).pipe(
          map((table: Table) => {
            this.notificationService.showSuccessCreated('Table');
            return addTableSuccess({ table });
          }),
          catchError((error) => {
            this.notificationService.showFailureCreated(error.error.message);
            return of(addTableFailure(error));
          })
        );
      })
    ));

  deleteTable$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTableAttempt),
      switchMap((payload) => {
        return this.adminService.deleteTable(payload.tableId).pipe(
          map((table: Table) => {
            this.notificationService.showDeleted();
            return deleteTableSuccess({ table });
          }),
          catchError((error) => {
            this.notificationService.showFailureDelete(error.error.message);
            return of(deleteTableFailure(error));
          })
        );
      })
    ));

  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
  }
}

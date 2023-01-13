import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTableAttempt, getTableListAttempt, addTableSuccess, deleteTableSuccess } from '../../../../state/table/table.actions';
import { Table } from '../../../../shared/models/table.model';
import { selectTableList } from '../../../../state/table/table.selector';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { selectRoomSpaceList } from '../../../../state/room-space/room-space.selector';
import { RoomSpace } from '../../../../shared/models/room-space.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss', '../user-list/user-list.component.scss']
})
export class TableComponent implements OnInit{
  tableList$ = this._store.select(selectTableList);
  tableList: Table[];
  table: Table = {
    tableNumber: 0,
    isErgonomic: false
  };
  roomSpaceList: RoomSpace[];

  roomSpaceList$ = this._store.select(selectRoomSpaceList);

  displayedColumns = ['tableNumber', 'isErgonomic', 'actions'];


  constructor(public dialog: MatDialog, private _store: Store, private actions$: Actions) {
  }

  ngOnInit(): void {
    this.roomSpaceList$.subscribe(roomSpaceList => this.roomSpaceList = roomSpaceList);
    this._store.dispatch(getTableListAttempt());
    this.tableList$.subscribe(tableList => this.tableList = tableList);
    this.actions$.pipe(ofType(addTableSuccess, deleteTableSuccess)).subscribe(() => {
      this._store.dispatch(getTableListAttempt());
    })
  }

  openDialog(table: Table): void {
    this.dialog.open(TableDialogComponent, { data: table });
  }

  onDeleteTable(tableId: string): void {
    this._store.dispatch(deleteTableAttempt({ tableId }));
    this._store.dispatch(getTableListAttempt());
  }
}

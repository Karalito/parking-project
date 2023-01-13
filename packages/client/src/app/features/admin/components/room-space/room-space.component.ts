import { Component, OnInit } from '@angular/core';
import { selectRoomSpaceList } from '../../../../state/room-space/room-space.selector';
import { Store } from '@ngrx/store';
import { RoomSpace } from '../../../../shared/models/room-space.model';
import { addRoomSpaceSuccess, deleteRoomSpaceAttempt, deleteRoomSpaceSuccess, getRoomSpaceListAttempt } from '../../../../state/room-space/room-space.actions';
import { MatDialog } from '@angular/material/dialog';
import { RoomSpaceDialogComponent } from './room-space-dialog/room-space-dialog.component';
import { selectTableList } from '../../../../state/table/table.selector';
import { table } from 'console';
import { Table } from '../../../../shared/models/table.model';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-room-space',
  templateUrl: './room-space.component.html',
  styleUrls: ['./room-space.component.scss', '../user-list/user-list.component.scss']
})
export class RoomSpaceComponent implements OnInit {

  roomSpaceList$ = this._store.select(selectRoomSpaceList);
  tableList$ = this._store.select(selectTableList);
  roomSpaceList: RoomSpace[];
  tableList: Table[];
  roomSpace: RoomSpace = {
    roomNumber: 0,
    tableId: ''
  };
  displayedColumns = ['roomNumber', 'tableId', 'actions'];

  constructor(public dialog: MatDialog, private _store: Store, private actions$: Actions) {
  }

  ngOnInit(): void {
    this._store.dispatch(getRoomSpaceListAttempt());
    this.roomSpaceList$.subscribe(roomSpaceList => this.roomSpaceList = roomSpaceList);
    this.tableList$.subscribe(tableList => this.tableList = tableList);
    this.actions$.pipe(ofType(addRoomSpaceSuccess, deleteRoomSpaceSuccess)).subscribe(() => {
      this._store.dispatch(getRoomSpaceListAttempt());
    })
  }

  openDialog(roomSpace: RoomSpace): void {
    this.dialog.open(RoomSpaceDialogComponent, { data: roomSpace });
  }

  onDeleteRoomSpace(roomSpaceId: string): void {
    this._store.dispatch(deleteRoomSpaceAttempt({ roomSpaceId }));
    this._store.dispatch(getRoomSpaceListAttempt());
  }
}

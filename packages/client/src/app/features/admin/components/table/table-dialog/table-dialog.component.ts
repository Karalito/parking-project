import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from '../../../../../shared/models/table.model';
import { addTableAttempt, getTableListAttempt } from '../../../../../state/table/table.actions';
import { RoomSpace } from '../../../../../shared/models/room-space.model';
import { selectRoomSpaceList } from '../../../../../state/room-space/room-space.selector';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent implements OnInit {
  form: FormGroup;
  roomSpaceList$ = this._store.select(selectRoomSpaceList)
  roomSpaceList: RoomSpace[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public table: Table,
    private _store: Store,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.roomSpaceList$.subscribe(roomSpaceList => this.roomSpaceList = roomSpaceList);
    this.form = new FormGroup({
      tableNumber: new FormControl(1, [Validators.required, Validators.minLength(1)]),
      isErgonomic: new FormControl(false, [Validators.required])
    });
  }

  onSubmit(): void {
    const table: Table = {
      tableNumber: this.form.get('tableNumber').value,
      isErgonomic: this.form.get('isErgonomic').value
    };

    this._store.dispatch(addTableAttempt({ table }));
    this._store.dispatch(getTableListAttempt());
  }

}

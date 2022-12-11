import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomSpace } from '../../../../../shared/models/room-space.model';
import { addRoomSpaceAttempt, getRoomSpaceListAttempt } from '../../../../../state/room-space/room-space.actions';
import { selectTableList } from '../../../../../state/table/table.selector';
import { Table } from '../../../../../shared/models/table.model';

@Component({
  selector: 'app-room-space-dialog',
  templateUrl: './room-space-dialog.component.html',
  styleUrls: ['./room-space-dialog.component.scss']
})
export class RoomSpaceDialogComponent implements OnInit {
  form: FormGroup;
  tableList$ = this._store.select(selectTableList);
  tableList: Table[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public roomSpace: RoomSpace,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.tableList$.subscribe(tableList => this.tableList = tableList);

    this.form = new FormGroup({
      roomNumber: new FormControl(0, [Validators.required, Validators.minLength(1)]),
      tableId: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    const roomSpace: RoomSpace = {
      roomNumber: this.form.get('roomNumber').value,
      tableId: this.form.get('tableId').value
    };

    this._store.dispatch(addRoomSpaceAttempt({ roomSpace }));
    this._store.dispatch(getRoomSpaceListAttempt());
  }

}

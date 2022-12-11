import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Hardware } from '../../../../shared/models/hardware.model';
import { selectHardwareList } from '../../../../state/hardware/hardware.selector';
import { deleteHardwareAttempt, getHardwareListAttempt } from '../../../../state/hardware/hardware.actions';
import { MatDialog } from '@angular/material/dialog';
import { HardwareDialogComponent } from './hardware-dialog/hardware-dialog.component';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss', '../user-list/user-list.component.scss']
})
export class HardwareComponent implements OnInit {

  hardwareList$ = this._store.select(selectHardwareList);
  hardwareList: Hardware[];
  hardware: Hardware = {
    name: '',
    size: '',
  };
  displayedColumns: string[] = ['name', 'size', 'actions'];

  constructor(public dialog: MatDialog, private _store: Store) {
  }

  ngOnInit(): void {
    this._store.dispatch(getHardwareListAttempt());
    this.hardwareList$.subscribe(hardwareList => this.hardwareList = hardwareList);
  }

  openDialog(hardware: Hardware) {
    this.dialog.open(HardwareDialogComponent, { data: hardware });
  }

  onDeleteHardware(hardwareId: string) {
    this._store.dispatch(deleteHardwareAttempt({ hardwareId }));
    this._store.dispatch(getHardwareListAttempt());
  }
}

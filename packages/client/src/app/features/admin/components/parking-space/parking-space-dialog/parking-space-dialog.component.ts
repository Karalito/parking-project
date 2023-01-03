import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ParkingSpace } from '../../../../../shared/models/parking-space.model';
import {
  addParkingSpaceAttempt,
  getParkingSpaceListAttempt
} from '../../../../../state/parking-space/parking-space.actions';

@Component({
  selector: 'app-parking-space-dialog',
  templateUrl: './parking-space-dialog.component.html',
  styleUrls: ['./parking-space-dialog.component.scss']
})
export class ParkingSpaceDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public parkingSpace: ParkingSpace,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      parkingPlaceNumber: new FormControl(1, [Validators.required, Validators.minLength(1)])
    });
  }

  onSubmit(): void {
    const parkingSpace: ParkingSpace = {
      parkingPlaceNumber: this.form.get('parkingPlaceNumber').value
    };

    this._store.dispatch(addParkingSpaceAttempt({ parkingSpace }));
    this._store.dispatch(getParkingSpaceListAttempt());
  }

}

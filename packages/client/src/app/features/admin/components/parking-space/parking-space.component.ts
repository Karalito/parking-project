import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectParkingSpaceList } from '../../../../state/parking-space/parking-space.selector';
import {
  addParkingSpaceSuccess,
  deleteParkingSpaceAttempt,
  getParkingSpaceListAttempt
} from '../../../../state/parking-space/parking-space.actions';
import { ParkingSpace } from '../../../../shared/models/parking-space.model';
import { MatDialog } from '@angular/material/dialog';
import { ParkingSpaceDialogComponent } from './parking-space-dialog/parking-space-dialog.component';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.scss', '../user-list/user-list.component.scss']
})
export class ParkingSpaceComponent implements OnInit {
  parkingSpaceList$ = this._store.select(selectParkingSpaceList);
  parkingSpaceList: ParkingSpace[];
  parkingSpace: ParkingSpace = {
    parkingPlaceNumber: 0
  };
  displayedColumns = ['parkingSpaceNumber', 'actions'];

  constructor(public dialog: MatDialog, private _store: Store, private actions$: Actions) {
  }

  ngOnInit(): void {
    this._store.dispatch(getParkingSpaceListAttempt());
    this.parkingSpaceList$.subscribe(parkingSpaceList => this.parkingSpaceList = parkingSpaceList);
    this.actions$.pipe(ofType(addParkingSpaceSuccess, deleteParkingSpaceAttempt)).subscribe(() => {
      this._store.dispatch(getParkingSpaceListAttempt());
    })
  }

  openDialog(parkingSpace: ParkingSpace) {
    this.dialog.open(ParkingSpaceDialogComponent, { data: parkingSpace });
  }

  onDeleteParkingSpace(parkingSpaceId: string) {
    this._store.dispatch(deleteParkingSpaceAttempt({ parkingSpaceId }));
    this._store.dispatch(getParkingSpaceListAttempt());
  }
}

import { Component, Input } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  displayedColumns: string[] = ['avatar', 'name', 'email', 'role', 'changeStatus'];

  @Input() userList: User[];

  constructor(public dialog: MatDialog) {
  }

  openDialog(user: User) {
    // Accepts two params, first - component, second - optional params
    this.dialog.open(UserDialogComponent, { data: user });
  }


  // addReservation(newReservation: RoomReservation): void {
  //   this.addTableReservation.emit(newReservation);
  // }
  //
  // deleteReservation(oldReservation: RoomReservation): void {
  //   this.removeTableReservation.emit(oldReservation);
  // }
}

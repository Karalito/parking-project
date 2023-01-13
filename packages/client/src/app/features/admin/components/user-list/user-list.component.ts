import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { selectUserList } from '../../../../state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { getUserListAttempt, updateUserSuccess } from '../../../../state/auth/auth.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList$ = this._store.select(selectUserList);
  userList: User[];
  displayedColumns: string[] = ['avatar', 'name', 'email', 'role', 'actions'];

  constructor(public dialog: MatDialog, private _store: Store, private actions$: Actions) {
  }

  ngOnInit() {
    this._store.dispatch(getUserListAttempt());
    this.userList$.subscribe(userList => this.userList = userList);
    this.actions$.pipe(ofType(updateUserSuccess)).subscribe(() => {
      this._store.dispatch(getUserListAttempt());
    })
  }

  openDialog(user: User) {
    // Accepts two params, first - component, second - optional params
    this.dialog.open(UserDialogComponent, { data: user });
  }
}

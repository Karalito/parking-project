import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserList } from 'src/app/state/auth/auth.selectors';
import { getUserListAttempt } from '../../state/auth/auth.actions';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userList$ = this._store.select(selectUserList);
  userList: User[];
  constructor(private _store: Store) {
  }

  ngOnInit() {
    this._store.dispatch(getUserListAttempt());
    this.userList$.subscribe(userList => this.userList = userList);
  }
}

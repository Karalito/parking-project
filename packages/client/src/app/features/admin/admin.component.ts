import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserList } from 'src/app/state/auth/auth.selectors';
import { getUserListAttempt } from '../../state/auth/auth.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private _store: Store) {
  }

  userList$ = this._store.select(selectUserList);

  ngOnInit() {
    this._store.dispatch(getUserListAttempt());
  }

}

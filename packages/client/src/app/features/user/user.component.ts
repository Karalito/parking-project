import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private store: Store) {}
  user$ = this.store.select(selectUser);
}

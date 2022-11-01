import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private store: Store) {}
}

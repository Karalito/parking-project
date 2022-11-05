import { Component, Inject } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../../../../shared/enums/user-roles.enum';
import { Store } from '@ngrx/store';
import { updateUserAttempt } from '../../../../../state/auth/auth.actions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  roles = Role;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private _store: Store) {
  }

  onSubmit() {
    const user = {
      fullName: this.form.get('fullName').value,
      email: this.form.get('email').value,
      role: this.form.get('role').value,
      avatar: this.form.get('avatar').value,
      _id: this.user._id,
      providerId: this.user.providerId,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    };
    this._store.dispatch(updateUserAttempt({ user }));
  }
}

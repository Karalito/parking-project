import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../../../shared/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../../../../shared/enums/user-roles.enum';
import { Store } from '@ngrx/store';
import { getUserListAttempt, updateUserAttempt } from '../../../../../state/auth/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  roles = Role;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _store: Store,
    private _fromBuilder: FormBuilder,
    private _notificationService: NotificationService) {
  }

  ngOnInit() {
    this.form = this._fromBuilder.group({
      fullName: [this.user.fullName, Validators.required],
      email: [this.user.email, Validators.required],
      role: [this.user.role, Validators.required],
      avatar: [this.user.avatar, null]
    });
  }

  onSubmit() {
    const user: User = {
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
    this._store.dispatch(getUserListAttempt());
    this._notificationService.showSuccessUpdateUser(`User: ${this.user.fullName} was updated successfully`);
  }
}

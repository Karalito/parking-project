import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hardware } from '../../../../../shared/models/hardware.model';
import { Store } from '@ngrx/store';
import { addHardwareAttempt, getHardwareListAttempt } from '../../../../../state/hardware/hardware.actions';

@Component({
  selector: 'app-hardware-dialog',
  templateUrl: './hardware-dialog.component.html',
  styleUrls: ['./hardware-dialog.component.scss']
})
export class HardwareDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public hardware: Hardware,
    private _store: Store,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const hardware: Hardware = {
      name: this.form.get('name').value,
      size: this.form.get('size').value,
    };

    this._store.dispatch(addHardwareAttempt({ hardware }));
    this._store.dispatch(getHardwareListAttempt());
  }
}

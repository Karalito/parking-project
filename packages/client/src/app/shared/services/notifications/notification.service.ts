import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showFailAdd() {
    this.snackBar.open('You cannot have more than 1 reservation per day!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'yellow-snackbar'
    });
  }

  showFailDelete() {
    this.snackBar.open('You can only delete your own reservation!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'yellow-snackbar'
    });
  }

  showDeleted() {
    this.snackBar.open('Deleted!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'red-snackbar'
    });
  }
  
  showSuccess() {
    this.snackBar.open('Successfully reserved!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'green-snackbar'
    });
  }
}

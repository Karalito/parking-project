import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthService } from '../auth/services/auth.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDialogComponent } from './components/user-list/user-dialog/user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AdminComponent, UserListComponent, UserDialogComponent],
  entryComponents: [UserDialogComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
  providers: [AuthService]
})
export class AdminModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AuthService } from '../auth/services/auth.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDialogComponent } from './components/user-list/user-dialog/user-dialog.component';
import { TableComponent } from './components/table/table.component';
import { HardwareComponent } from './components/hardware/hardware.component';
import { ParkingSpaceComponent } from './components/parking-space/parking-space.component';
import { RoomSpaceComponent } from './components/room-space/room-space.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminService } from './admin.service';
import { HardwareDialogComponent } from './components/hardware/hardware-dialog/hardware-dialog.component';
import { ParkingSpaceDialogComponent } from './components/parking-space/parking-space-dialog/parking-space-dialog.component';
import { RoomSpaceDialogComponent } from './components/room-space/room-space-dialog/room-space-dialog.component';
import { TableDialogComponent } from './components/table/table-dialog/table-dialog.component';
import { RoomTablePipe } from '../../shared/pipes/table-room.pipe';

@NgModule({
  declarations: [AdminComponent, UserListComponent, UserDialogComponent, TableComponent, HardwareComponent, ParkingSpaceComponent, RoomSpaceComponent, HardwareDialogComponent, ParkingSpaceDialogComponent, RoomSpaceDialogComponent, TableDialogComponent, RoomTablePipe],
  entryComponents: [UserDialogComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule, MatCheckboxModule],
  exports: [
    RoomTablePipe
  ],
  providers: [AuthService, AdminService]
})
export class AdminModule {
}

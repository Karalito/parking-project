import { ParkingReservationComponent } from './components/parking-reservation/parking-reservation.component';
import { ParkingReservationListComponent } from './components/parking-reservation/parking-reservation-list/parking-reservation-list.component';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CustomCalendarHeader } from './components/calendar/calendar-header/calendar-header.component';
import { RoomReservationComponent } from './components/room-reservation/room-reservation.component';
import { TableViewComponent } from './components/room-reservation/table-view/table-view.component';
import { FreeSpacesCountComponent } from './components/free-spaces-count/free-spaces-count.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomReservationDialogComponent } from './components/room-reservation/room-reservation-dialog/room-reservation-dialog.component';
import { AdminModule } from '../admin/admin.module';
import { IdToRoomNumberPipe } from '../../shared/pipes/id-to-room-number.pipe';
import { HardwareNamePipe } from '../../shared/pipes/hardware-name.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ParkingReservationListComponent,
    ParkingReservationComponent,
    CalendarComponent,
    CustomCalendarHeader,
    RoomReservationComponent,
    TableViewComponent,
    FreeSpacesCountComponent,
    RoomReservationDialogComponent,
    IdToRoomNumberPipe,
    HardwareNamePipe
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, SharedModule, AdminModule]
})
export class HomeModule {}

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './features/auth/interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { authReducer } from './state/auth/auth.reducers';
import { AuthEffects } from './state/auth/auth.effects';
import { parkingReservationReducer } from './state/parking-reservation/parking-reservation.reducer';
import { roomReservationReducer } from './state/room-reservation/room-reservation.reducer';
import { RoomReservationEffects } from './state/room-reservation/room-reservation.effects';
import { ParkingReservationEffects } from './state/parking-reservation/parking-reservation.effects';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { tableReducer } from './state/table/table.reducer';
import { TableEffects } from './state/table/table.effects';
import { hardwareReducer } from './state/hardware/hardware.reducer';
import { HardwareEffects } from './state/hardware/hardware.effects';
import { ParkingSpaceEffects } from './state/parking-space/parking-space.effects';
import { parkingSpaceReducer } from './state/parking-space/parking-space.reducer';
import { roomSpaceReducer } from './state/room-space/room-space.reducer';
import { RoomSpaceEffects } from './state/room-space/room-space.effects';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forRoot({
      auth: authReducer,
      parkingReservation: parkingReservationReducer,
      parkingSpace: parkingSpaceReducer,
      roomReservation: roomReservationReducer,
      roomSpace: roomSpaceReducer,
      table: tableReducer,
      hardware: hardwareReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ParkingReservationEffects,
      RoomReservationEffects,
      TableEffects,
      HardwareEffects,
      ParkingSpaceEffects,
      RoomSpaceEffects
    ])
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ENVIRONMENTS } from './shared/constants/constant';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoomReservationsModule } from './features/room-reservations/room-reservations.module';
import { ParkingReservationsModule } from './features/parking-reservations/parking-reservations.module';
import { CurrentUserInterceptor } from './shared/interceptors/current-user.interceptor';
import { RoomReservationSpacesModule } from './features/room-reservation-spaces/room-reservation-spaces.module';
import { ParkingReservationSpacesModule } from './features/parking-reservation-spaces/parking-reservation-spaces.module';
import { PopulateDbModule } from './features/populate-db/populate-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ENVIRONMENTS.development, isGlobal: true }),
    MongooseModule.forRoot(mongoConfig.uri),
    AuthModule,
    UsersModule,
    RoomReservationsModule,
    ParkingReservationsModule,
    RoomReservationSpacesModule,
    ParkingReservationSpacesModule,
    PopulateDbModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }]
})
export class AppModule {
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ENVIRONMENTS } from './shared/constants/constant';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './features/user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoomReservationModule } from './features/room-reservation/room-reservation.module';
import { ParkingReservationModule } from './features/parking-reservation/parking-reservation.module';
import { CurrentUserInterceptor } from './shared/interceptors/current-user.interceptor';
import { RoomSpaceModule } from './features/room-space/room-space.module';
import {
  ParkingSpaceModule
} from './features/parking-space/parking-space.module';
import { HardwareModule } from './features/hardware/hardware.module';
import { TableModule } from './features/table/table.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ENVIRONMENTS.development, isGlobal: true }),
    MongooseModule.forRoot(mongoConfig.uri),
    AuthModule,
    UserModule,
    RoomReservationModule,
    ParkingReservationModule,
    RoomSpaceModule,
    ParkingSpaceModule,
    HardwareModule,
    TableModule,
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
    }
  ]
})
export class AppModule {
}

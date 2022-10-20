import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ENVIRONMENTS } from './shared/constants/constant';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ENVIRONMENTS.development, isGlobal: true }),
    MongooseModule.forRoot(mongoConfig.uri),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }]
})
export class AppModule {
}

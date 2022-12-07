import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hardware, HardwareSchema } from '../../schemas/hardware.schema';
import { HardwareController } from './controllers/hardware.controller';
import { HardwareService } from './services/hardware.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hardware.name, schema: HardwareSchema }])],
  providers: [HardwareService],
  controllers: [HardwareController],
})
export class HardwareModule {
}

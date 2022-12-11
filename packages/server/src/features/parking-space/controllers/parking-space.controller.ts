import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParkingSpaceService } from '../services/parking-space.service';
import { ParkingSpace } from '../../../schemas/parking-space.schema';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { CreateParkingSpaceDto } from '../dto/create-parking-space.dto';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';

@Controller(DOMAIN_NAMES.PARKING_SPACES)
export class ParkingSpaceController {
  constructor(private readonly _parkingSpaceService: ParkingSpaceService) {
  }

  @Post()
  async create(@Body() createParkingSpace: CreateParkingSpaceDto): Promise<ParkingSpace> {
    return await this._parkingSpaceService.create(createParkingSpace);
  }

  @Get()
  async findAll(): Promise<ParkingSpace[]> {
    return await this._parkingSpaceService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<ParkingSpace> {
    return await this._parkingSpaceService.findOne(params.id);
  }

  @Delete(':id')
  async delete(@Param() params: FindByIdDto): Promise<ParkingSpace> {
    return await this._parkingSpaceService.delete(params.id);
  }
}

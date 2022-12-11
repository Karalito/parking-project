import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { ParkingReservationsService } from '../services/parking-reservations.service';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { CreateParkingReservationDto } from '../dto/create-parking-reservation.dto';
import { ParkingReservation } from '../../../schemas/parking-reservation.schema';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';
import { RequestUser } from '../../../shared/decorators/user.decorator';
import { User } from '../../../schemas/user.schema';

@Controller(DOMAIN_NAMES.PARKING_RESERVATIONS)
export class ParkingReservationController {
  constructor(private readonly _parkingReservationsService: ParkingReservationsService) {
  }

  @Post()
  async addNew(@Body() createParkingReservationDto: CreateParkingReservationDto): Promise<ParkingReservation> {
    return await this._parkingReservationsService.addNew(createParkingReservationDto);
  }

  @Get()
  async findByDate(@Query('date') date: string): Promise<ParkingReservation[]> {
    return await this._parkingReservationsService.findByDate(date);
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<ParkingReservation> {
    return await this._parkingReservationsService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: FindByIdDto, @Body() updateParkingReservationDto): Promise<ParkingReservation> {
    return await this._parkingReservationsService.update(params.id, updateParkingReservationDto);
  }

  @Delete(':id')
  async remove(@Param() params: FindByIdDto, @RequestUser() user: User): Promise<ParkingReservation> {
    return await this._parkingReservationsService.remove(params.id, user);
  }
}

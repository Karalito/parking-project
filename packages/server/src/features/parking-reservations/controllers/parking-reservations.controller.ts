import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ParkingReservationsService } from '../services/parking-reservations.service';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { CreateParkingReservationDto } from '../dto/create-parking-reservation.dto';
import { ParkingReservation } from '../../../schemas/parking-reservation.schema';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';

@Controller(DOMAIN_NAMES.PARKING_RESERVATIONS)
export class ParkingReservationsController {
  constructor(private readonly _parkingReservationsService: ParkingReservationsService) {
  }

  @Post()
  async addNew(@Res() response, @Body() createParkingReservationDto: CreateParkingReservationDto): Promise<ParkingReservation> {
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
  async remove(@Param() params: FindByIdDto): Promise<ParkingReservation> {
    return await this._parkingReservationsService.remove(params.id);
  }
}

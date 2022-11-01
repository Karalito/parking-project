import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RoomReservationsService } from '../services/room-reservations.service';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { CreateRoomReservationDto } from '../dto/create-room-reservation.dto';
import { RoomReservation } from '../../../schemas/room-reservation.schema';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';
import { UpdateRoomReservationDto } from '../dto/update-room-reservation.dto';
import { RequestUser } from '../../../shared/decorators/user.decorator';
import { User } from '../../../schemas/user.schema';

@Controller(DOMAIN_NAMES.ROOM_RESERVATIONS)
export class RoomReservationsController {
  constructor(private readonly _roomReservationsService: RoomReservationsService) {
  }

  @Post()
  async addNew(@Body() createRoomReservationDto: CreateRoomReservationDto): Promise<RoomReservation> {
    return await this._roomReservationsService.addNew(createRoomReservationDto);
  }

  @Get()
  async findByDate(@Query('date') date: string): Promise<RoomReservation[]> {
    return await this._roomReservationsService.findByDate(date);
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<RoomReservation> {
    return await this._roomReservationsService.findOne(params.id);
  }

  @Patch(':id')
  async update(
    @Param() params: FindByIdDto,
    @Body() updateRoomReservationDto: UpdateRoomReservationDto
  ): Promise<RoomReservation> {
    return await this._roomReservationsService.update(params.id, updateRoomReservationDto);
  }

  @Delete(':id')
  async remove(@Param() params: FindByIdDto, @RequestUser() requestUser: User): Promise<RoomReservation> {
    return await this._roomReservationsService.remove(params.id, requestUser);
  }
}

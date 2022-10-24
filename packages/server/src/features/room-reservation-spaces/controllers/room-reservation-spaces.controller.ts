import { Controller, Get } from '@nestjs/common';
import { RoomReservationSpacesService } from '../services/room-reservation-spaces.service';
import { RoomReservationSpace } from '../../../schemas/room-reservation-space.schema';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';

@Controller(DOMAIN_NAMES.ROOM_RESERVATION_SPACES)
export class RoomReservationSpacesController {
  constructor(private readonly _roomReservationSpaceService: RoomReservationSpacesService) {}

  @Get()
  async findAll(): Promise<RoomReservationSpace[]> {
    return await this._roomReservationSpaceService.findAll();
  }
}

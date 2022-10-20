import { Controller } from '@nestjs/common';
import { RoomReservationSpaceService } from '../services/room-reservation-space.service';

@Controller('room-reservation-space')
export class RoomReservationSpaceController {
  constructor(private readonly roomReservationSpaceService: RoomReservationSpaceService) {}
}

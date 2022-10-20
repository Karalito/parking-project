import { Controller } from '@nestjs/common';
import { RoomReservationsService } from '../services/room-reservations.service';

@Controller('room-reservations')
export class RoomReservationsController {
  constructor(private readonly roomReservationsService: RoomReservationsService) {}
}

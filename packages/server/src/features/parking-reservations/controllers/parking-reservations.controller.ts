import { Controller } from '@nestjs/common';
import { ParkingReservationsService } from '../services/parking-reservations.service';

@Controller('parking-reservations')
export class ParkingReservationsController {
  constructor(private readonly parkingReservationsService: ParkingReservationsService) {}
}

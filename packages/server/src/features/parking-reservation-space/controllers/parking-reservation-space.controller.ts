import { Controller } from '@nestjs/common';
import { ParkingReservationSpaceService } from '../services/parking-reservation-space.service';

@Controller('parking-reservation-space')
export class ParkingReservationSpaceController {
  constructor(private readonly parkingReservationSpaceService: ParkingReservationSpaceService) {}
}

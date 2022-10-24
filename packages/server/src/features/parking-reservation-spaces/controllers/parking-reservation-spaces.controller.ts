import { Controller, Get } from '@nestjs/common';
import { ParkingReservationSpacesService } from '../services/parking-reservation-spaces.service';
import { ParkingReservationSpace } from '../../../schemas/parking-reservation-space.schema';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';

@Controller(DOMAIN_NAMES.PARKING_RESERVATION_SPACES)
export class ParkingReservationSpacesController {
  constructor(private readonly _parkingReservationSpaceService: ParkingReservationSpacesService) {
  }

  @Get()
  async findAll(): Promise<ParkingReservationSpace[]> {
    return await this._parkingReservationSpaceService.findAll();
  }
}

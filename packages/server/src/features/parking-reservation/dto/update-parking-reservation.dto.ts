import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingReservationDto } from './create-parking-reservation.dto';

export class UpdateParkingReservationDto extends PartialType(CreateParkingReservationDto) {

}

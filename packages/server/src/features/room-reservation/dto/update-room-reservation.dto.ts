import { CreateRoomReservationDto } from './create-room-reservation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRoomReservationDto extends PartialType(CreateRoomReservationDto) {
}

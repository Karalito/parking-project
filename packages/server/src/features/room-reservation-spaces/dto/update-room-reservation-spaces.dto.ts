import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomReservationSpaceDto } from './create-room-reservation-spaces.dto';

export class UpdateRoomReservationSpaceDto extends PartialType(CreateRoomReservationSpaceDto) {
}

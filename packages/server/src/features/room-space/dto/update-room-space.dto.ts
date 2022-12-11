import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomSpaceDto } from './create-room-space.dto';

export class UpdateRoomSpaceDto extends PartialType(CreateRoomSpaceDto) {
}

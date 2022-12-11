import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomSpaceService } from '../services/room-space.service';
import { RoomSpace } from '../../../schemas/room-space.schema';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { CreateRoomSpaceDto } from '../dto/create-room-space.dto';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';

@Controller(DOMAIN_NAMES.ROOM_SPACES)
export class RoomSpaceController {
  constructor(private readonly _roomSpaceService: RoomSpaceService) {
  }

  @Post()
  async create(@Body() createRoomSpaceDto: CreateRoomSpaceDto): Promise<RoomSpace> {
    return await this._roomSpaceService.create(createRoomSpaceDto);
  }

  @Get()
  async findAll(): Promise<RoomSpace[]> {
    return await this._roomSpaceService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<RoomSpace> {
    return await this._roomSpaceService.findOne(params.id);
  }

  @Delete(':id')
  async delete(@Param() params: FindByIdDto): Promise<RoomSpace> {
    return await this._roomSpaceService.delete(params.id);
  }
}

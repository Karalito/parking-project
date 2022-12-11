import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomSpace, RoomSpaceDocument } from '../../../schemas/room-space.schema';
import { Model } from 'mongoose';
import { CreateRoomSpaceDto } from '../dto/create-room-space.dto';
import { NOT_FOUND_MESSAGES } from 'src/shared/enums/texts.enum';
import { UpdateRoomSpaceDto } from '../dto/update-room-space.dto';

@Injectable()
export class RoomSpaceService {
  constructor(@InjectModel(RoomSpace.name) private readonly roomSpaceModel: Model<RoomSpaceDocument>) {
  }

  async create(createRoomReservationSpaceDto: CreateRoomSpaceDto): Promise<RoomSpace> {
    return await this.roomSpaceModel.create(createRoomReservationSpaceDto);
  }

  async findAll(): Promise<RoomSpace[]> {
    return await this.roomSpaceModel.find().exec();
  }

  async findOne(id: string): Promise<RoomSpace> {
    const roomSpace: RoomSpace = await this.roomSpaceModel.findById(id).exec();

    if (!roomSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_SPACE_NOT_FOUND);

    return roomSpace;
  }

  async update(_id: string, updateRoomReservationSpaceDto: UpdateRoomSpaceDto): Promise<RoomSpace> {
    const updatedRoomSpace: RoomSpace = await this.roomSpaceModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateRoomReservationSpaceDto } },
      { new: true }
    ).exec();

    if (!updatedRoomSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_SPACE_NOT_FOUND);

    return updatedRoomSpace;
  }

  async delete(_id: string): Promise<RoomSpace> {
    const deletedRoomSpace: RoomSpace = await this.roomSpaceModel.findByIdAndDelete({ _id }).exec();

    if (!deletedRoomSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_SPACE_NOT_FOUND);

    return deletedRoomSpace;
  }
}

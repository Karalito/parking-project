import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomReservationSpace, RoomReservationSpaceDocument } from '../../../schemas/room-reservation-space.schema';
import { Model } from 'mongoose';
import { CreateRoomReservationSpaceDto } from '../dto/create-room-reservation-spaces.dto';
import { NOT_FOUND_MESSAGES } from 'src/shared/enums/texts.enum';
import { UpdateRoomReservationSpaceDto } from '../dto/update-room-reservation-spaces.dto';

@Injectable()
export class RoomReservationSpacesService {
  constructor(@InjectModel(RoomReservationSpace.name) private readonly _roomReservationSpaceModel: Model<RoomReservationSpaceDocument>) {
  }

  async create(createRoomReservationSpaceDto: CreateRoomReservationSpaceDto): Promise<RoomReservationSpace> {
    return await this._roomReservationSpaceModel.create(createRoomReservationSpaceDto);
  }

  async findAll(): Promise<RoomReservationSpace[]> {
    return await this._roomReservationSpaceModel.find().exec();
  }

  async findOne(id: string): Promise<RoomReservationSpace> {
    const roomReservationSpace: RoomReservationSpace = await this._roomReservationSpaceModel.findById(id).exec();

    if (!roomReservationSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_SPACE_NOT_FOUND);

    return roomReservationSpace;
  }

  async update(_id: string, updateRoomReservationSpaceDto: UpdateRoomReservationSpaceDto): Promise<RoomReservationSpace> {
    const updatedRoomReservationSpace: RoomReservationSpace = await this._roomReservationSpaceModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateRoomReservationSpaceDto } },
      { new: true }
    ).exec();

    if (!updatedRoomReservationSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_SPACE_NOT_FOUND);

    return updatedRoomReservationSpace;
  }

  async delete(_id: string): Promise<RoomReservationSpace> {
    const deletedRoomReservationSpace: RoomReservationSpace = await this._roomReservationSpaceModel.findByIdAndDelete({ _id }).exec();

    if (!deletedRoomReservationSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_SPACE_NOT_FOUND);

    return deletedRoomReservationSpace;
  }
}

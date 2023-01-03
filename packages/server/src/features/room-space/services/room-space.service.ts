import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomSpace, RoomSpaceDocument } from '../../../schemas/room-space.schema';
import { Model } from 'mongoose';
import { CreateRoomSpaceDto } from '../dto/create-room-space.dto';
import { NOT_FOUND_MESSAGES } from 'src/shared/enums/texts.enum';
import { UpdateRoomSpaceDto } from '../dto/update-room-space.dto';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';

@Injectable()
export class RoomSpaceService {
  constructor(
    @InjectModel(RoomSpace.name) private readonly roomSpaceModel: Model<RoomSpaceDocument>,
    @InjectModel(RoomReservation.name) private readonly roomReservationModel: Model<RoomReservationDocument>) {
  }

  async create(createRoomReservationSpaceDto: CreateRoomSpaceDto): Promise<RoomSpace> {
    const roomSpace = await this.roomSpaceModel.findOne({
      roomNumber: createRoomReservationSpaceDto.roomNumber,
      tableId: createRoomReservationSpaceDto.tableId
    });

    if (roomSpace) throw new MethodNotAllowedException('This Room Space Configuration already exists');

    return await this.roomSpaceModel.create(createRoomReservationSpaceDto);
  }

  async findAll(): Promise<RoomSpace[]> {
    return await this.roomSpaceModel.find().sort('roomNumber').exec();
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

    await this.roomReservationModel.deleteMany({ roomId: _id });

    return deletedRoomSpace;
  }
}

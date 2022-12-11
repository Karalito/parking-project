import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';
import { Model } from 'mongoose';
import { CreateRoomReservationDto } from '../dto/create-room-reservation.dto';
import { NOT_ALLOWED_MESSAGES, NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { ROOM_RESERVATION_SPACES } from '../../../shared/constants/constant';
import { UpdateRoomReservationDto } from '../dto/update-room-reservation.dto';
import { User } from '../../../schemas/user.schema';
import { Role } from '../../../shared/enums/auth.enum';
import { RoomSpace, RoomSpaceDocument } from '../../../schemas/room-space.schema';

@Injectable()
export class RoomReservationService {
  constructor(
    @InjectModel(RoomReservation.name) private readonly roomReservationModel: Model<RoomReservationDocument>,
    @InjectModel(RoomSpace.name) private readonly roomSpaceModel: Model<RoomSpaceDocument>
  ) {
  }

  async findByDate(date: string): Promise<RoomReservation[]> {
    let reservationList: RoomReservation[];

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate.getTime() + 86400000);

      reservationList = await this.roomReservationModel.find({ date: { $gte: startDate, $lt: endDate } }).exec();
    } else {
      reservationList = await this.roomReservationModel.find().exec();
    }

    return reservationList;
  }

  async addNew(createRoomReservationDto: CreateRoomReservationDto): Promise<RoomReservation> {
    const reservationsByDate: RoomReservation[] = await this.findByDate(createRoomReservationDto.date.toString());

    // ROOM_RESERVATION_SPACES Replace this with additional request from DB.
    const roomSpaces = await this.roomSpaceModel.find().exec();

    if (reservationsByDate.length >= roomSpaces.length) {
      throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.NO_MORE_SPACES);
    }

    for (const reservation of reservationsByDate) {
      if (reservation.roomId === createRoomReservationDto.roomId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.ALREADY_TAKEN);
      }
      if (reservation.userId.toString() === createRoomReservationDto.userId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_RESERVATION_EXISTS);
      }
    }
    return await this.roomReservationModel.create(createRoomReservationDto);
  }

  async findOne(id: string): Promise<RoomReservation> {
    const reservation: RoomReservation = await this.roomReservationModel.findById(id).exec();

    if (!reservation) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);

    return reservation;
  }

  async update(_id: string, updateRoomReservationDto: UpdateRoomReservationDto): Promise<RoomReservation> {
    const updatedReservation: RoomReservation = await this.roomReservationModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateRoomReservationDto } },
      { new: true }
    ).exec();

    if (!updatedReservation) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);

    return updatedReservation;
  }

  async remove(_id: string, user: User): Promise<RoomReservation> {
    const isCreator = this.isCreator(_id, user);

    if (!isCreator) throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_IS_NOT_CREATOR);

    const deletedReservation: RoomReservation = await this.roomReservationModel.findByIdAndDelete({ _id }).exec();

    if (!deletedReservation) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);

    return deletedReservation;
  }

  async isCreator(_id: string, user: User): Promise<boolean> {
    if (!(user.role === Role.ADMIN)) {
      const reservation = await this.findOne(_id);
      if (reservation.userId.toString() !== user._id.toString()) return false;
    }
    return true;
  }
}

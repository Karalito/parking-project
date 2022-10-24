import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';
import { Model } from 'mongoose';
import { CreateRoomReservationDto } from '../dto/create-room-reservation.dto';
import { NOT_ALLOWED_MESSAGES, NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { ROOM_RESERVATION_SPACES } from '../../../shared/constants/constant';
import { UpdateRoomReservationDto } from '../dto/update-room-reservation.dto';

@Injectable()
export class RoomReservationsService {
  constructor(@InjectModel(RoomReservation.name) private readonly _roomReservationModel: Model<RoomReservationDocument>) {
  }

  async findByDate(date: string): Promise<RoomReservation[]> {
    let reservationList: RoomReservation[];

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate.getTime() + 86400000);

      reservationList = await this._roomReservationModel.find({ date: { $gte: startDate, $lt: endDate } }).exec();
    } else {
      reservationList = await this._roomReservationModel.find().exec();
    }

    return reservationList;
  }

  async addNew(createRoomReservationDto: CreateRoomReservationDto): Promise<RoomReservation> {
    const reservationsByDate: RoomReservation[] = await this.findByDate(createRoomReservationDto.date.toString());

    // ROOM_RESERVATION_SPACES Replace this with additional request from DB.
    if (reservationsByDate.length >= ROOM_RESERVATION_SPACES.length) {
      throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.NO_MORE_SPACES);
    }

    for (const reservation of reservationsByDate) {
      if (reservation.roomId === createRoomReservationDto.roomId &&
        reservation.tableId === createRoomReservationDto.tableId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.ALREADY_TAKEN);
      }
      if (reservation.userId.toString() === createRoomReservationDto.userId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_RESERVATION_EXISTS);
      }
    }
    return await this._roomReservationModel.create(createRoomReservationDto);
  }

  async findOne(id: string): Promise<RoomReservation> {
    const reservation: RoomReservation = await this._roomReservationModel.findById(id).exec();

    if (!reservation) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);

    return reservation;
  }

  async update(_id: string, updateRoomReservationDto: UpdateRoomReservationDto): Promise<RoomReservation> {
    const updatedReservation: RoomReservation = await this._roomReservationModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateRoomReservationDto } },
      { new: true }
    ).exec();

    if (!updatedReservation) throw new NotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);

    return updatedReservation;
  }

  async remove(_id: string): Promise<RoomReservation> {
    const deletedReservation: RoomReservation = await this._roomReservationModel.findByIdAndDelete({ _id }).exec();

    if (!deletedReservation) throw new NotFoundException('Could not find room reservation!');

    return deletedReservation;
  }
}

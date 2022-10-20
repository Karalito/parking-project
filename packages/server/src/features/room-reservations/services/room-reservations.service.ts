import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';
import { Model } from 'mongoose';
import { CreateRoomReservationDto } from '../dto/create-room-reservation.dto';
import { CustomNotFoundException } from '../../../middlewares/exceptions/custom-not-found.exception';
import { NOT_ALLOWED_MESSAGES, NOT_FOUND_MESSAGES } from '../../../shared/constants/texts.constant';
import { ROOM_RESERVATION_SPACES } from '../../../shared/constants/constant';

@Injectable()
export class RoomReservationsService {
  constructor(@InjectModel(RoomReservation.name) private readonly roomReservationModel: Model<RoomReservationDocument>) {
  }

  async findByDate(date: string): Promise<RoomReservation[]> {
    let result: RoomReservation[];

    try {
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(startDate.getTime() + 86400000);

        result = await this.roomReservationModel.find({ date: { $gte: startDate, $lt: endDate } }).exec();
      } else {
        result = await this.roomReservationModel.find().exec();
      }
    } catch (error) {
      throw new CustomNotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);
    }
    return result;
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

      if (reservation.userId === createRoomReservationDto.userId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_RESERVATION_EXISTS);
      }
    }
    return await this.roomReservationModel.create(createRoomReservationDto);
  }

  async findAll(): Promise<RoomReservation[]> {
    return await this.roomReservationModel.find().exec();
  }

  async findOne(id: string): Promise<RoomReservation> {
    let reservation: RoomReservation;
    try {
      reservation = await this.roomReservationModel.findById(id).exec();
    } catch (error) {
      throw new CustomNotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);
    }

    if (!reservation) {
      throw new CustomNotFoundException(NOT_FOUND_MESSAGES.ROOM_RESERVATION_NOT_FOUND);
    }

    return reservation;
  }
}

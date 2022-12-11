import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingReservation } from '../../../schemas/parking-reservation.schema';
import { Model } from 'mongoose';
import { NOT_ALLOWED_MESSAGES, NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { CreateParkingReservationDto } from '../dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from '../dto/update-parking-reservation.dto';
import { User } from '../../../schemas/user.schema';
import { Role } from '../../../shared/enums/auth.enum';
import { ParkingSpace } from '../../../schemas/parking-space.schema';

@Injectable()
export class ParkingReservationsService {
  constructor(
    @InjectModel(ParkingReservation.name) private readonly parkingReservationModel: Model<ParkingReservation>,
    @InjectModel(ParkingSpace.name) private readonly parkingSpaceModel: Model<ParkingSpace>,) {
  }

  async findByDate(date: string): Promise<ParkingReservation[]> {
    let reservationList: ParkingReservation[];
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate.getTime() + 86400000);

      reservationList = await this.parkingReservationModel.find(
        { date: { $gte: startDate, $lt: endDate } }
      ).exec();
    } else {
      reservationList = await this.parkingReservationModel.find().exec();
    }
    return reservationList;
  }

  async addNew(createParkingReservationDto: CreateParkingReservationDto): Promise<ParkingReservation> {
    const reservationsByDate: ParkingReservation[] = await this.findByDate(createParkingReservationDto.date.toString());

    const parkingSpaces = await this.parkingSpaceModel.find().exec();
    // Replace with additional req from DB
    if (reservationsByDate.length >= parkingSpaces.length) {
      throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.NO_MORE_SPACES);
    }

    for (const reservation of reservationsByDate) {
      if (reservation.parkingPlaceId === createParkingReservationDto.parkingPlaceId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.ALREADY_TAKEN);
      }

      if (reservation.userId.toString() === createParkingReservationDto.userId) {
        throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_RESERVATION_EXISTS);
      }
    }

    return await this.parkingReservationModel.create(createParkingReservationDto);
  }

  async findOne(id: string): Promise<ParkingReservation> {
    const reservation = await this.parkingReservationModel.findById(id).exec();

    if (!reservation) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_RESERVATION_NOT_FOUND);

    return reservation;
  }

  async update(_id: string, updateParkingReservationDto: UpdateParkingReservationDto): Promise<ParkingReservation> {
    const updatedReservation = await this.parkingReservationModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateParkingReservationDto } },
      { new: true }
    ).exec();

    if (!updatedReservation) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_RESERVATION_NOT_FOUND);

    return updatedReservation;
  }

  async remove(_id: string, user: User): Promise<ParkingReservation> {
    const isCreator = this.isCreator(_id, user);

    if (!isCreator) throw new MethodNotAllowedException(NOT_ALLOWED_MESSAGES.USER_IS_NOT_CREATOR);

    const deletedReservation = await this.parkingReservationModel.findByIdAndDelete({ _id }).exec();

    if (!deletedReservation) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_RESERVATION_NOT_FOUND);

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

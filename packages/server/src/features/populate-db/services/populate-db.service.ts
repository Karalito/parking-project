import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { ParkingReservation, ParkingReservationDocument } from '../../../schemas/parking-reservation.schema';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';
import {
  ParkingReservationSpace,
  ParkingReservationSpaceDocument
} from '../../../schemas/parking-reservation-space.schema';
import { RoomReservationSpace, RoomReservationSpaceDocument } from '../../../schemas/room-reservation-space.schema';
import { PARKING_RESERVATION_SPACES, ROOM_RESERVATION_SPACES, USER_EXAMPLE } from '../../../shared/constants/constant';

@Injectable()
export class PopulateDbService {
  logger: Logger;

  constructor(
    @InjectModel(RoomReservationSpace.name)
    private readonly roomReservationSpaceModel: Model<RoomReservationSpaceDocument>,
    @InjectModel(ParkingReservationSpace.name)
    private readonly parkingReservationSpaceModel: Model<ParkingReservationSpaceDocument>,
    @InjectModel(RoomReservation.name)
    private readonly roomReservationModel: Model<RoomReservationDocument>,
    @InjectModel(ParkingReservation.name)
    private readonly parkingReservationModel: Model<ParkingReservationDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {
    this.logger = new Logger();
  }

  async populateDatabase(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      await this.deleteDatabase();
      await this.createParkingSpace();
      await this.createRoomSpace();
      await this.createUser();
      return 'Default database was created';
    } else return 'You must use DEV environment for that!';
  }

  async createParkingSpace(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.parkingReservationSpaceModel.create(PARKING_RESERVATION_SPACES);
      } catch (error) {
        this.logger.log(error);
      }
      return `Parking reservation spaces were seeded.`;
    }
    return 'You must use DEV environment for that!';
  }

  async createRoomSpace(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.roomReservationSpaceModel.create(ROOM_RESERVATION_SPACES);
      } catch (error) {
        this.logger.log(error);
      }
      return `Room reservation spaces were seeded.`;
    }
    return 'You must use DEV environment for that!';
  }

  async createUser(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.userModel.create(USER_EXAMPLE);
      } catch (error) {
        this.logger.log(error);
      }
      return `Users were added.`;
    }
    return 'You must use DEV environment for that!';
  }

  async deleteDatabase(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.deleteParkingReservation();
        await this.deleteRoomReservation();
        await this.deleteParkingSpace();
        await this.deleteRoomSpace();
        await this.deleteUser();
        return `All database was deleted.`;
      } catch (error) {
        throw new NotFoundException('Could not delete database!', error);
      }
    }
    return 'You must use DEV environment for that!';
  }

  async deleteParkingReservation(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.parkingReservationModel.deleteMany({}).exec();
      } catch (error) {
        throw new NotFoundException('Could not delete parking reservation! ', error);
      }
      return `Parking reservations were deleted.`;
    }
    return 'You must use DEV environment for that!';
  }

  async deleteParkingSpace(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.parkingReservationSpaceModel.deleteMany({}).exec();
      } catch (error) {
        throw new NotFoundException('Could not delete parking reservation spaces! ', error);
      }
      return `Parking reservation spaces were deleted.`;
    }
    return 'You must use DEV environment for that!';
  }

  async deleteRoomReservation(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.roomReservationModel.deleteMany({}).exec();
      } catch (error) {
        throw new NotFoundException('Could not delete room reservation! ', error);
      }
      return `Room reservations were deleted.`;
    }
    return 'You must use DEV environment for that!';
  }

  async deleteRoomSpace(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.roomReservationSpaceModel.deleteMany({}).exec();
      } catch (error) {
        throw new NotFoundException('Could not delete room reservation spaces! ', error);
      }
      return `Room reservations spaces were deleted.`;
    }
    return 'You must use DEV environment for that!';
  }

  async deleteUser(): Promise<string> {
    if (process.env.NODE_ENV === 'dev') {
      try {
        await this.userModel.deleteMany({}).exec();
      } catch (error) {
        throw new NotFoundException('Could not delete users! ', error);
      }
      return `Users were deleted.`;
    }
    return 'You must use DEV environment for that!';
  }
}

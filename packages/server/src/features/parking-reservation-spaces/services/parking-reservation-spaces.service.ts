import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ParkingReservationSpace } from '../../../schemas/parking-reservation-space.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ParkingReservationSpacesService {
  constructor(
    @InjectModel(ParkingReservationSpace.name)
    private readonly _parkingReservationSpaceModel: Model<ParkingReservationSpace>) {
  }

  async findAll(): Promise<ParkingReservationSpace[]> {
    return await this._parkingReservationSpaceModel.find().exec();
  }
}

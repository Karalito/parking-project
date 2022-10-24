import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomReservationSpace, RoomReservationSpaceDocument } from '../../../schemas/room-reservation-space.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomReservationSpacesService {
  constructor(@InjectModel(RoomReservationSpace.name) private readonly _roomReservationSpaceModel: Model<RoomReservationSpaceDocument>) {
  }

  async findAll(): Promise<RoomReservationSpaceDocument[]> {
    return await this._roomReservationSpaceModel.find().exec();
  }
}

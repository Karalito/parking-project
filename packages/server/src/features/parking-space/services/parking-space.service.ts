import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ParkingSpace } from '../../../schemas/parking-space.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateParkingSpaceDto } from '../dto/create-parking-space.dto';
import { NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectModel(ParkingSpace.name)
    private readonly parkingSpaceModel: Model<ParkingSpace>) {
  }


  async create(createParkingSpaceDto: CreateParkingSpaceDto): Promise<ParkingSpace> {
    return this.parkingSpaceModel.create(createParkingSpaceDto);
  }

  async findAll(): Promise<ParkingSpace[]> {
    return await this.parkingSpaceModel.find().exec();
  }

  async findOne(id: string): Promise<ParkingSpace> {
    const parkingSpace = await this.parkingSpaceModel.findById(id).exec();

    if (!parkingSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_SPACE_NOT_FOUND);

    return parkingSpace;
  }

  async delete(_id: string): Promise<ParkingSpace> {
    const deletedParkingSpace = await this.parkingSpaceModel.findByIdAndDelete({ _id }).exec();

    if (!deletedParkingSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_SPACE_NOT_FOUND);

    return deletedParkingSpace;
  }
}

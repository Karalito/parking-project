import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ParkingSpace } from '../../../schemas/parking-space.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateParkingSpaceDto } from '../dto/create-parking-space.dto';
import { NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { ParkingReservation } from '../../../schemas/parking-reservation.schema';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectModel(ParkingSpace.name)
    private readonly parkingSpaceModel: Model<ParkingSpace>,
    @InjectModel(ParkingReservation.name) private readonly parkingReservationModel: Model<ParkingReservation>
  ) {
  }


  async create(createParkingSpaceDto: CreateParkingSpaceDto): Promise<ParkingSpace> {
    const parkingSpace = await this.parkingSpaceModel.findOne({ parkingPlaceNumber: createParkingSpaceDto.parkingPlaceNumber });

    if (parkingSpace) throw new MethodNotAllowedException('Parking space with this number already exists');

    return this.parkingSpaceModel.create(createParkingSpaceDto);
  }

  async findAll(): Promise<ParkingSpace[]> {
    return await this.parkingSpaceModel.find().sort('parkingPlaceNumber').exec();
  }

  async findOne(id: string): Promise<ParkingSpace> {
    const parkingSpace = await this.parkingSpaceModel.findById(id).exec();

    if (!parkingSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_SPACE_NOT_FOUND);

    return parkingSpace;
  }

  async delete(_id: string): Promise<ParkingSpace> {
    const deletedParkingSpace = await this.parkingSpaceModel.findByIdAndDelete({ _id }).exec();

    if (!deletedParkingSpace) throw new NotFoundException(NOT_FOUND_MESSAGES.PARKING_SPACE_NOT_FOUND);

    await this.parkingReservationModel.deleteMany({ parkingSpaceId: _id });

    return deletedParkingSpace;
  }
}

import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hardware, HardwareDocument } from '../../../schemas/hardware.schema';
import { Model } from 'mongoose';
import { CreateHardwareDto } from '../dto/create-hardware.dto';
import { NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { UpdateHardwareDto } from '../dto/update-hardware.dto';

@Injectable()
export class HardwareService {
  constructor(@InjectModel(Hardware.name) private readonly _hardwareModel: Model<HardwareDocument>) {
  }

  async create(createHardwareDto: CreateHardwareDto): Promise<Hardware> {
    const hardware = await this._hardwareModel.findOne({ name: createHardwareDto.name, size: createHardwareDto.size });

    if (hardware) throw new MethodNotAllowedException('This hardware already exists');

    return await this._hardwareModel.create(createHardwareDto);
  }

  async findOne(id: string): Promise<Hardware> {
    const hardware: Hardware = await this._hardwareModel.findById(id).exec();

    if (!hardware) throw new NotFoundException(NOT_FOUND_MESSAGES.HARDWARE_NOT_FOUND);

    return hardware;
  }

  async findAll(): Promise<Hardware[]> {
    const hardwareList: Hardware[] = await this._hardwareModel.find().sort('name').exec();

    if (!hardwareList && hardwareList.length === 0) throw new NotFoundException(NOT_FOUND_MESSAGES.HARDWARE_LIST_EMPTY);

    return hardwareList;
  }

  async update(_id: string, updateHardwareDto: UpdateHardwareDto): Promise<Hardware> {
    const updatedHardware: Hardware = await this._hardwareModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateHardwareDto } },
      { new: true }
    ).exec();

    if (!updatedHardware) throw new NotFoundException(NOT_FOUND_MESSAGES.HARDWARE_NOT_FOUND);

    return updatedHardware;
  }

  async delete(_id: string): Promise<Hardware> {
    const deletedHardware: Hardware = await this._hardwareModel.findByIdAndDelete({ _id }).exec();

    if (!deletedHardware) throw new NotFoundException(NOT_FOUND_MESSAGES.HARDWARE_NOT_FOUND);

    return deletedHardware;
  }
}

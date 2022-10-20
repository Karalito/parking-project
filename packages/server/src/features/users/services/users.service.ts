import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { CustomNotFoundException } from '../../../middlewares/exceptions/custom-not-found.exception';
import { NOT_FOUND_MESSAGES } from '../../../shared/constants/texts.constant';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new CustomNotFoundException(NOT_FOUND_MESSAGES.USER_NOT_FOUND);
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id }, { $set: { ...updateUserDto } }, { new: true }).exec();
  }

  async remove(_id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove({ _id }).exec();
  }
}

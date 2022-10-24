import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../schemas/user.schema';
import { NOT_FOUND_MESSAGES } from '../../../shared/enums/texts.enum';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private  readonly _userModel: Model<UserDocument>) {
  }

  async findAll(): Promise<User[]> {
    const userList: User[] = await this._userModel.find().exec();

    if (!userList && userList.length == 0) throw new NotFoundException(NOT_FOUND_MESSAGES.USERS_NOT_FOUND);

    return userList;
  }

  async findOne(id: string): Promise<User> {
    const existingUser: User = await this._userModel.findById(id).exec();

    if (!existingUser) throw new NotFoundException(NOT_FOUND_MESSAGES.USER_NOT_FOUND);

    return existingUser;
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser: User = await this._userModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateUserDto } },
      { new: true }
    ).exec();

    if (!updatedUser) throw new NotFoundException(NOT_FOUND_MESSAGES.USER_NOT_FOUND);

    return updatedUser;
  }

  async remove(_id: string): Promise<User> {
    const deletedUser: User = await this._userModel.findByIdAndDelete({ _id }).exec();

    if (!deletedUser) throw new NotFoundException(NOT_FOUND_MESSAGES.USER_NOT_FOUND);

    return deletedUser;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../schemas/user.schema';
import { CreateUserDto } from '../../../features/user/dto/create-user.dto';

@Injectable()
export class UserSecurityService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findOneByProviderId(providerId: string): Promise<User | undefined> {
    return await this.userModel.findOne({ providerId }).exec();
  }
}

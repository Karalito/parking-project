import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Role } from '../../../shared/enums/auth.enum';

export class CreateUserDto{
  @IsMongoId()
  readonly _id: mongoose.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;

  @IsString()
  readonly providerId: string;

  @IsEnum(Role)
  readonly role: Role;
}

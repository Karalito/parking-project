import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { UserService } from '../services/user.service';
import { User } from '../../../schemas/user.schema';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../../shared/enums/auth.enum';
import { RequestUser } from '../../../shared/decorators/user.decorator';

@Controller(DOMAIN_NAMES.USERS)
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<User> {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: FindByIdDto, @Body() updateUserDto: UpdateUserDto, @RequestUser() user): Promise<User> {
    await this.findOne(params);

    return await this.usersService.update(params.id, updateUserDto, user);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param() params: FindByIdDto): Promise<User> {
    await this.findOne(params);

    return await this.usersService.remove(params.id);
  }
}


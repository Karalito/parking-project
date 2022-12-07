import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { HardwareService } from '../services/hardware.service';
import { CreateHardwareDto } from '../dto/create-hardware.dto';
import { Hardware } from '../../../schemas/hardware.schema';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';
import { UpdateHardwareDto } from '../dto/update-hardware.dto';

@Controller(DOMAIN_NAMES.HARDWARE)
export class HardwareController {
  constructor(private readonly _hardwareService: HardwareService) {
  }

  @Post()
  async create(@Body() createHardwareDto: CreateHardwareDto): Promise<Hardware> {
    return await this._hardwareService.create(createHardwareDto);
  }

  @Get()
  async findAll(): Promise<Hardware[]> {
    return await this._hardwareService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindByIdDto): Promise<Hardware> {
    return await this._hardwareService.findOne(params.id);
  }

  @Patch(':id')
  async update(
    @Param() params: FindByIdDto,
    @Body() updateHardwareDto: UpdateHardwareDto
  ): Promise<Hardware> {
    return await this._hardwareService.update(params.id, updateHardwareDto);
  }

  @Delete(':id')
  async delete(@Param() params: FindByIdDto): Promise<Hardware> {
    return await this._hardwareService.delete(params.id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';
import { TableService } from '../services/table.service';
import { Table } from '../../../schemas/table.schema';
import { CreateTableDto } from '../dto/create-table.dto';
import { FindByIdDto } from '../../../shared/dto/find-by-id.dto';
import { UpdateTableDto } from '../dto/update-table.dto';

@Controller(DOMAIN_NAMES.TABLE)
export class TableController {
  constructor(private readonly _tableService: TableService) {
  }

  @Post()
  async create(@Body() createTableDto: CreateTableDto): Promise<Table> {
    return await this._tableService.create(createTableDto);
  }

  @Get()
  async findAll(): Promise<Table[]> {
    return await this._tableService.findAll();
  }

  @Get('id')
  async findOne(@Param() params: FindByIdDto): Promise<Table> {
    return await this._tableService.findOne(params.id);
  }

  @Patch('id')
  async update(
    @Param() params: FindByIdDto,
    @Body() updateTableDto: UpdateTableDto
  ): Promise<Table> {
    return await this._tableService.update(params.id, updateTableDto);
  }

  @Delete('id')
  async delete(@Param() params: FindByIdDto): Promise<Table> {
    return await this._tableService.delete(params.id);
  }
}

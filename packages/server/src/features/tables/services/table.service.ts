import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table, TableDocument } from '../../../schemas/table.schema';
import { Model } from 'mongoose';
import { CreateTableDto } from '../dto/create-table.dto';
import { NOT_FOUND_MESSAGES } from 'src/shared/enums/texts.enum';
import { UpdateTableDto } from '../dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(@InjectModel(Table.name) private readonly _tableModel: Model<TableDocument>) {
  }

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this._tableModel.create(createTableDto);
  }

  async findOne(id: string): Promise<Table> {
    const table: Table = await this._tableModel.findById(id).exec();

    if (!table) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    return table;
  }

  async findAll(): Promise<Table[]> {
    const tableList: Table[] = await this._tableModel.find().exec();

    if (!tableList && tableList.length === 0) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_LIST_EMPTY);

    return tableList;
  }

  async update(_id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    const updatedTable: Table = await this._tableModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateTableDto } },
      { new: true }
    ).exec();

    if (!updatedTable) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    return updatedTable;
  }

  async delete(_id: string): Promise<Table> {
    const deletedTable: Table = await this._tableModel.findByIdAndDelete({ _id }).exec();

    if (!deletedTable) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    return deletedTable;
  }
}

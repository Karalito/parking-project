import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table, TableDocument } from '../../../schemas/table.schema';
import { Model } from 'mongoose';
import { CreateTableDto } from '../dto/create-table.dto';
import { NOT_FOUND_MESSAGES } from 'src/shared/enums/texts.enum';
import { UpdateTableDto } from '../dto/update-table.dto';
import { RoomSpace, RoomSpaceDocument } from '../../../schemas/room-space.schema';
import { RoomReservation, RoomReservationDocument } from '../../../schemas/room-reservation.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
    @InjectModel(RoomSpace.name) private readonly roomSpaceModel: Model<RoomSpaceDocument>,
    @InjectModel(RoomReservation.name) private readonly roomReservationModel: Model<RoomReservationDocument>) {
  }

  async create(createTableDto: CreateTableDto): Promise<Table> {
    const table = await this.tableModel.findOne({ tableNumber: createTableDto.tableNumber });

    if (table) throw new MethodNotAllowedException('Table with this number already exists');

    return this.tableModel.create(createTableDto);
  }

  async findOne(id: string): Promise<Table> {
    const table: Table = await this.tableModel.findById(id).exec();

    if (!table) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    return table;
  }

  async findAll(): Promise<Table[]> {
    const tableList: Table[] = await this.tableModel.find().sort('tableNumber').exec();

    if (!tableList && tableList.length === 0) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_LIST_EMPTY);

    return tableList;
  }

  async update(_id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    const updatedTable: Table = await this.tableModel.findOneAndUpdate(
      { _id },
      { $set: { ...updateTableDto } },
      { new: true }
    ).exec();

    if (!updatedTable) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    return updatedTable;
  }

  async delete(_id: string): Promise<Table> {
    const deletedTable: Table = await this.tableModel.findByIdAndDelete({ _id }).exec();

    if (!deletedTable) throw new NotFoundException(NOT_FOUND_MESSAGES.TABLE_NOT_FOUND);

    const roomSpace: RoomSpace = await this.roomSpaceModel.findOne({ tableId: _id }).exec();

    if (roomSpace) {
      await this.roomSpaceModel.deleteMany({ tableId: _id });

      await this.roomReservationModel.deleteMany({ roomId: roomSpace._id });
    }


    return deletedTable;
  }
}

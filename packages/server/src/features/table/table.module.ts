import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from '../../schemas/table.schema';
import { TableService } from './services/table.service';
import { TableController } from './controllers/table.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }])],
  providers: [TableService],
  controllers: [TableController]
})
export class TableModule {
}

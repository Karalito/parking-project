import { Pipe } from '@angular/core';
import { Table } from '../models/table.model';

@Pipe({
  name: 'roomTable'
})
export class RoomTablePipe {
  transform(arg1: any, tableList: Table[]): string[] {
    if (tableList) {
      return tableList.filter(table => {
        return table._id === arg1
      }).map(table => {
        return table.tableNumber.toString();
      });
    }
    return [];
  }
}

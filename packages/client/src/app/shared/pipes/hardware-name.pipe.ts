import { Hardware } from '../models/hardware.model';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'hardwareName'
})
export class HardwareNamePipe {
  transform(id: any, hardwareList: Hardware[]): string[] {
    console.log('id and list ', id, hardwareList);
    if (hardwareList) {
      return hardwareList.filter(hardware => {
        return hardware._id === id;
      }).map(hardware => {
        console.log(hardware);
        return hardware.name + ' ' + hardware.size;
      });
    }
    return [];
  }
}

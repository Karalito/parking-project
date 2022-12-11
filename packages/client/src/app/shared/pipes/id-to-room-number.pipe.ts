import { Pipe, PipeTransform } from '@angular/core';
import { RoomSpace } from '../models/room-space.model';
import { Store } from '@ngrx/store';

@Pipe({ name: 'roomNumber' })
export class IdToRoomNumberPipe implements PipeTransform {
  transform(id: string, roomList: RoomSpace[]): string[] {
    if (roomList) {
      return roomList.filter(room => {
        return room._id === id;
      }).map(room => {
        return room.roomNumber.toString();
      });
    }
    return [];
  }
}

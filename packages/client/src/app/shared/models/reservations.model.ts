import { Moment } from 'moment';

export interface ParkingReservation {
  _id: string;
  userId: string;
  parkingPlaceId: string;
}

export interface RoomReservation {
  _id?: string;
  userId: string;
  roomId: string;
  hardwareId?: string;
  date?: Moment;
}

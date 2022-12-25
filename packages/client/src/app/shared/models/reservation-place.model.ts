export interface ParkingReservationSpace {
  _id: string;
  parkingPlaceId: string;
  name?: string;
  avatar?: string;
}

export interface RoomReservationSpace {
  _id: string;
  roomId: string;
  tableId: string;
  hardwareId?: string;
  name: string;
  avatar: string;
  hardwareName: string;
  table: string;
}

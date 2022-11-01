export interface ParkingReservationSpace {
  _id: string;
  parkingPlaceId: string;
  name: string;
  avatar: string;
}

export interface RoomReservationSpace {
  _id: string;
  roomId: string;
  tableId: string;
  screenSize: string;
  name: string;
  avatar: string;
}

export interface ParkingReservation {
  _id: string;
  userId: string;
  parkingPlaceId: string;
  place: number;
}

export interface RoomReservation {
  _id: string;
  userId: string;
  roomId: string;
  tableId: string;
}

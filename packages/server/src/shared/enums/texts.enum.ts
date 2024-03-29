export enum NOT_FOUND_MESSAGES {
  USER_NOT_FOUND = 'User not found!',
  USERS_NOT_FOUND = 'Users not found!',
  ROOM_RESERVATION_NOT_FOUND = 'Room reservation not found!',
  ROOM_RESERVATIONS_NOT_FOUND = 'Room reservations not found!',
  PARKING_RESERVATION_NOT_FOUND = 'Parking reservation not found!',
  PARKING_RESERVATIONS_NOT_FOUND = 'Parking reservations not found!',
  HARDWARE_NOT_FOUND = 'Hardware not found!',
  HARDWARE_LIST_EMPTY = 'Hardware list is empty!',
  ROOM_RESERVATION_SPACE_NOT_FOUND = 'Room reservation space not found!',
  TABLE_NOT_FOUND = 'Table not found!',
  TABLE_LIST_EMPTY = 'Table list is empty!',
  PARKING_SPACE_NOT_FOUND = 'Parking space not found!',
  ROOM_SPACE_NOT_FOUND = 'Room space not found!',
}

export enum NOT_ALLOWED_MESSAGES {
  NO_MORE_SPACES = 'Could not make a reservation, all spaces are taken.',
  ALREADY_TAKEN = 'Could not make a Reservation, this spot is already taken.',
  USER_RESERVATION_EXISTS = 'Could not make a Reservation, User already has a reservation.',
  USER_IS_NOT_CREATOR = 'Could not make a Reservation, Reservation does not belong to this user.',
  USER_IS_NOT_OWNER = 'Could not update User, User is not profile owner.',
  ITEM_ALREADY_EXISTS = 'This item already exists.'
}

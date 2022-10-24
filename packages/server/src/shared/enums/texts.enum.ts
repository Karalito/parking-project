export enum NOT_FOUND_MESSAGES {
  USER_NOT_FOUND = 'User not found!',
  USERS_NOT_FOUND = 'Users not found!',
  ROOM_RESERVATION_NOT_FOUND = 'Room reservation not found!',
  ROOM_RESERVATIONS_NOT_FOUND = 'Room reservations not found!',
  PARKING_RESERVATION_NOT_FOUND = 'Parking reservation not found!',
  PARKING_RESERVATIONS_NOT_FOUND = 'Parking reservations not found!'
}

export enum NOT_ALLOWED_MESSAGES {
  NO_MORE_SPACES = 'Could not make a reservation, all spaces are taken.',
  ALREADY_TAKEN = 'Could not make a Reservation, this spot is already taken.',
  USER_RESERVATION_EXISTS = 'Could not make a Reservation, User already has a reservation'
}

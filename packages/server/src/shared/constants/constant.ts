// JWT
import mongoose from 'mongoose';

export const IS_PUBLIC_KEY = 'isPublic';
//

// ENVIRONMENTS
export const ENVIRONMENTS = {
  development: '.env.development',
  production: '.env.production',
}
//


// FOR TESTING PURPOSES
export const ROOM_RESERVATION_SPACES = [
  {
    tableId: '1',
    roomId: '1',
    screenSize: 'XL'
  },
  {
    tableId: '2',
    roomId: '1',
    screenSize: '-'
  },
  {
    tableId: '3',
    roomId: '1',
    screenSize: 'L'
  },
  {
    tableId: '1',
    roomId: '2',
    screenSize: '-'
  },
  {
    tableId: '2',
    roomId: '2',
    screenSize: '-'
  },
  {
    tableId: '1',
    roomId: '3',
    screenSize: 'XL'
  }
];

export const PARKING_RESERVATION_SPACES = [
  {
    parkingPlaceId: '1'
  },
  {
    parkingPlaceId: '2'
  },
  {
    parkingPlaceId: '3'
  },
  {
    parkingPlaceId: '4'
  },
  {
    parkingPlaceId: '5'
  }
];

export const USER_EXAMPLE = [
  {
    _id: new mongoose.Types.ObjectId(),
    fullName: 'Test user',
    email: 'test@testatorius.com',
    role: 'User',
    providerId: '107762071001101516229'
  },
];
//

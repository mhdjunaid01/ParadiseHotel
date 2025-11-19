export type RoomType = 'Room' | 'Suite' | 'Villa';

export const ROOM_TYPES: RoomType[] = ['Room', 'Suite', 'Villa'];

export const BOOKING_CONSTRAINTS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_PHONE_LENGTH: 10,
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
} as const;

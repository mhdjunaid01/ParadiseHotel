export type RoomType = 'Room' | 'Suite' | 'Villa';

export const ROOM_TYPES: RoomType[] = ['Room', 'Suite', 'Villa'];

export const BOOKING_CONSTRAINTS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_PHONE_LENGTH: 10,
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
} as const;

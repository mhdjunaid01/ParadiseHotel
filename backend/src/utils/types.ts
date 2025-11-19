import { RoomType } from '../constants';

export interface Booking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType: RoomType;
  createdAt?: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  email?: string;
  roomType?: RoomType;
  checkInFrom?: Date;
  checkInTo?: Date;
}


import { bookingRepository } from '../repositories/bookingRepository';
import { Booking, PaginatedResponse, BookingQueryParams } from '../utils/types';
import { createError } from '../middleware/errorHandler';
import { PAGINATION } from '../constants';

export const createBooking = async (bookingData: Omit<Booking, '_id' | 'createdAt'>): Promise<Booking> => {
  return bookingRepository.create(bookingData);
};

export const getBookings = async (
  queryParams: BookingQueryParams = {}
): Promise<PaginatedResponse<Booking>> => {
  return bookingRepository.findMany(queryParams);
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const booking = await bookingRepository.findById(id);
  
  if (!booking) {
    throw createError('Booking not found', 404);
  }

  return booking;
};


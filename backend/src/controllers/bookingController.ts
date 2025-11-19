import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';
import { asyncHandler } from '../middleware/asyncHandler';
import { BookingQueryParams } from '../utils/types';
import { RoomType, ROOM_TYPES } from '../constants';

const parseQueryParams = (query: Request['query']): BookingQueryParams => {
  const params: BookingQueryParams = {};

  if (query.page) {
    const page = parseInt(String(query.page), 10);
    if (!isNaN(page) && page > 0) {
      params.page = page;
    }
  }

  if (query.limit) {
    const limit = parseInt(String(query.limit), 10);
    if (!isNaN(limit) && limit > 0) {
      params.limit = limit;
    }
  }

  if (query.email && typeof query.email === 'string') {
    params.email = query.email.trim();
  }

  if (query.roomType && typeof query.roomType === 'string') {
    if (ROOM_TYPES.includes(query.roomType as RoomType)) {
      params.roomType = query.roomType as RoomType;
    }
  }

  if (query.checkInFrom && typeof query.checkInFrom === 'string') {
    const date = new Date(query.checkInFrom);
    if (!isNaN(date.getTime())) {
      params.checkInFrom = date;
    }
  }

  if (query.checkInTo && typeof query.checkInTo === 'string') {
    const date = new Date(query.checkInTo);
    if (!isNaN(date.getTime())) {
      params.checkInTo = date;
    }
  }

  return params;
};

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await bookingService.createBooking(req.body);

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking,
  });
});

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
  const queryParams = parseQueryParams(req.query);
  const result = await bookingService.getBookings(queryParams);

  res.status(200).json({
    success: true,
    data: result,
  });
});


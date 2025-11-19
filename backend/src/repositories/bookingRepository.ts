import { BookingModel } from '../models/Booking';
import { Booking, PaginatedResponse, BookingQueryParams } from '../utils/types';
import { PAGINATION } from '../constants';

class BookingRepository {
  async create(bookingData: Omit<Booking, '_id' | 'createdAt'>): Promise<Booking> {
    const booking = await BookingModel.create(bookingData);
    return booking.toObject();
  }

  async findMany(queryParams: BookingQueryParams = {}): Promise<PaginatedResponse<Booking>> {
    const page = Math.max(1, queryParams.page || PAGINATION.DEFAULT_PAGE);
    const limit = Math.min(
      PAGINATION.MAX_LIMIT,
      Math.max(1, queryParams.limit || PAGINATION.DEFAULT_LIMIT)
    );
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (queryParams.email) {
      filter.email = { $regex: queryParams.email, $options: 'i' };
    }

    if (queryParams.roomType) {
      filter.roomType = queryParams.roomType;
    }

    if (queryParams.checkInFrom || queryParams.checkInTo) {
      filter.checkIn = {};
      if (queryParams.checkInFrom) {
        filter.checkIn.$gte = queryParams.checkInFrom;
      }
      if (queryParams.checkInTo) {
        filter.checkIn.$lte = queryParams.checkInTo;
      }
    }

    const [data, total] = await Promise.all([
      BookingModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      BookingModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data as Booking[],
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: string): Promise<Booking | null> {
    const booking = await BookingModel.findById(id).lean().exec();
    return booking as Booking | null;
  }
}

export const bookingRepository = new BookingRepository();

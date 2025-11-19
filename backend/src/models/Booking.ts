import mongoose, { Schema, Document } from 'mongoose';
import { Booking } from '../utils/types';
import { ROOM_TYPES, BOOKING_CONSTRAINTS } from '../constants';

export interface BookingDocument extends Booking, Document {}

const bookingSchema = new Schema<BookingDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [BOOKING_CONSTRAINTS.MAX_NAME_LENGTH, `Name cannot exceed ${BOOKING_CONSTRAINTS.MAX_NAME_LENGTH} characters`],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [BOOKING_CONSTRAINTS.MIN_GUESTS, `At least ${BOOKING_CONSTRAINTS.MIN_GUESTS} guest is required`],
      max: [BOOKING_CONSTRAINTS.MAX_GUESTS, `Maximum ${BOOKING_CONSTRAINTS.MAX_GUESTS} guests allowed`],
    },
    roomType: {
      type: String,
      required: [true, 'Room type is required'],
      enum: {
        values: ROOM_TYPES,
        message: `Room type must be one of: ${ROOM_TYPES.join(', ')}`,
      },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ email: 1 });
bookingSchema.index({ createdAt: -1 });

export const BookingModel = mongoose.model<BookingDocument>('Booking', bookingSchema);


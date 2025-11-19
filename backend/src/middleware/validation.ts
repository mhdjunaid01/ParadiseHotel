import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ROOM_TYPES, BOOKING_CONSTRAINTS, RoomType } from '../constants';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const loginSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string().min(1, 'Password is required'),
}).refine((data) => data.email || data.username, {
  message: 'Either email or username must be provided',
  path: ['email'],
});

export const bookingSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(
      BOOKING_CONSTRAINTS.MIN_NAME_LENGTH,
      `Name must be at least ${BOOKING_CONSTRAINTS.MIN_NAME_LENGTH} characters`
    )
    .max(
      BOOKING_CONSTRAINTS.MAX_NAME_LENGTH,
      `Name cannot exceed ${BOOKING_CONSTRAINTS.MAX_NAME_LENGTH} characters`
    )
    .trim(),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone must be a string',
    })
    .min(BOOKING_CONSTRAINTS.MIN_PHONE_LENGTH, 'Please provide a valid phone number')
    .trim(),

  checkIn: z.coerce
    .date({
      required_error: 'Check-in date is required',
      invalid_type_error: 'Invalid check-in date format. Expected YYYY-MM-DD',
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid check-in date',
    }),

  checkOut: z.coerce
    .date({
      required_error: 'Check-out date is required',
      invalid_type_error: 'Invalid check-out date format. Expected YYYY-MM-DD',
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid check-out date',
    }),

  guests: z.coerce
    .number({
      required_error: 'Number of guests is required',
      invalid_type_error: 'Number of guests must be a number',
    })
    .int('Guests must be a whole number')
    .min(
      BOOKING_CONSTRAINTS.MIN_GUESTS,
      `At least ${BOOKING_CONSTRAINTS.MIN_GUESTS} guest is required`
    )
    .max(
      BOOKING_CONSTRAINTS.MAX_GUESTS,
      `Maximum ${BOOKING_CONSTRAINTS.MAX_GUESTS} guests allowed`
    ),

  roomType: z.enum(['Room', 'Suite', 'Villa'] as [RoomType, ...RoomType[]], {
    required_error: 'Room type is required',
    invalid_type_error: `Room type must be one of: ${ROOM_TYPES.join(', ')}`,
  }),
})
.refine((data) => data.checkOut > data.checkIn, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});



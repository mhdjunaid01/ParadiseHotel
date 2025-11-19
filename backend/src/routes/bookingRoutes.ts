import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';
import { validate, bookingSchema } from '../middleware/validation';

const router = Router();

router.post('/', validate(bookingSchema), bookingController.createBooking);
router.get('/', bookingController.getBookings);

export default router;

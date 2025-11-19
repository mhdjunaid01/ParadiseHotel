'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { bookingApi } from '@/lib/api';
import { BookingFormData, RoomType } from '@/types/booking';
import { validateEmail, validatePhone } from '@/lib/utils';
import { ROOM_TYPES, BOOKING_CONSTRAINTS } from '@/constants';

export const BookingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: BOOKING_CONSTRAINTS.MIN_GUESTS,
    roomType: ROOM_TYPES[0],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const mutation = useMutation({
    mutationFn: bookingApi.createBooking,
    onSuccess: () => {
      router.push('/booking?success=true');
    },
    onError: (error: { message?: string; errors?: Array<{ path: string; message: string }> }) => {
      if (error.errors && error.errors.length > 0) {
        const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path as keyof BookingFormData;
          if (field) {
            fieldErrors[field] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ email: error.message || 'Failed to create booking. Please try again.' });
      }
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < BOOKING_CONSTRAINTS.MIN_NAME_LENGTH) {
      newErrors.name = `Name must be at least ${BOOKING_CONSTRAINTS.MIN_NAME_LENGTH} characters`;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    } else {
      const checkInDate = new Date(formData.checkIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        newErrors.checkIn = 'Check-in date cannot be in the past';
      }
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    } else if (formData.checkIn) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    if (formData.guests < BOOKING_CONSTRAINTS.MIN_GUESTS || formData.guests > BOOKING_CONSTRAINTS.MAX_GUESTS) {
      newErrors.guests = `Number of guests must be between ${BOOKING_CONSTRAINTS.MIN_GUESTS} and ${BOOKING_CONSTRAINTS.MAX_GUESTS}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        ...formData,
        guests: Number(formData.guests),
      };
      mutation.mutate(payload);
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-beige-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">
            Book Your Stay
          </h1>
          <p className="text-lg md:text-xl text-forest-700">
            Fill in the details below to reserve your room at Paradise Resort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-forest-100 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-forest-900">Booking Details</CardTitle>
                <CardDescription>
                  Please provide your information to complete the reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={errors.phone}
                      required
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={(e) => handleChange('checkIn', e.target.value)}
                        error={errors.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={(e) => handleChange('checkOut', e.target.value)}
                        error={errors.checkOut}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={(e) => handleChange('guests', parseInt(e.target.value) || 1)}
                        error={errors.guests}
                        min={BOOKING_CONSTRAINTS.MIN_GUESTS}
                        max={BOOKING_CONSTRAINTS.MAX_GUESTS}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select
                        value={formData.roomType}
                        onValueChange={(value) => handleChange('roomType', value as RoomType)}
                      >
                        <SelectTrigger id="roomType">
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROOM_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.roomType && (
                        <p className="mt-1 text-sm text-destructive">{errors.roomType}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={mutation.isPending}
                    className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                  >
                    Submit Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Illustration/Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex flex-col justify-center space-y-6"
          >
            <div className="relative h-full min-h-[500px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80"
                alt="Luxury resort room"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 to-transparent rounded-lg flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Experience Luxury</h3>
                  <p className="text-white/90">
                    Book your stay and enjoy world-class amenities, stunning views, and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

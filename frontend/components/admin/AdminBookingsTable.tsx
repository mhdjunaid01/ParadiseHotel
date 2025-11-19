'use client';

import { Booking } from '@/types/booking';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

interface AdminBookingsTableProps {
  bookings: Booking[];
}

export const AdminBookingsTable = ({ bookings }: AdminBookingsTableProps) => {
  if (bookings.length === 0) {
    return (
      <Card className="border-2 border-forest-100">
        <CardContent className="p-6 md:p-8 text-center">
          <p className="text-forest-600 text-base md:text-lg">No bookings found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-4">
        {bookings.map((booking) => (
          <Card key={booking._id} className="border border-gray-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {booking.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 break-all">{booking.email}</p>
                  <p className="text-sm text-gray-600 break-all">{booking.phone}</p>
                </div>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full whitespace-nowrap flex-shrink-0">
                  {booking.roomType}
                </span>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Check-in</p>
                  <p className="text-gray-900 font-medium">{formatDate(booking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Check-out</p>
                  <p className="text-gray-900 font-medium">{formatDate(booking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Guests</p>
                  <p className="text-gray-900 font-medium">{booking.guests}</p>
                </div>
                {booking.createdAt && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Booked On</p>
                    <p className="text-gray-900 font-medium text-xs">
                      {formatDateTime(booking.createdAt)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                    Room Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden xl:table-cell">
                    Booked On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {booking.name}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 break-words max-w-xs">
                        {booking.email}
                      </div>
                      <div className="text-sm text-gray-500 break-words max-w-xs">
                        {booking.phone}
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                        {booking.roomType}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">
                        <div>Check-in: {formatDate(booking.checkIn)}</div>
                        <div className="text-gray-500 mt-1">
                          Check-out: {formatDate(booking.checkOut)}
                        </div>
                        <div className="lg:hidden mt-2">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                            {booking.roomType}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{booking.guests}</div>
                    </td>
                    <td className="px-4 py-4 hidden xl:table-cell">
                      <div className="text-sm text-gray-500">
                        {booking.createdAt ? formatDateTime(booking.createdAt) : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

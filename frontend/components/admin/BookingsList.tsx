'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingApi } from '@/lib/api';
import { Button } from '../ui/button';
import { Container } from '../ui/Container';
import { AdminBookingsTable } from './AdminBookingsTable';
import { Card, CardContent } from '../ui/card';

const ITEMS_PER_PAGE = 10;

export const BookingsList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bookings', page],
    queryFn: () => bookingApi.getBookings(page, ITEMS_PER_PAGE),
  });

  const bookings = useMemo(() => data?.data.data || [], [data]);
  const pagination = useMemo(
    () => ({
      total: data?.data.total || 0,
      page: data?.data.page || 1,
      limit: data?.data.limit || 10,
      totalPages: data?.data.totalPages || 0,
    }),
    [data]
  );

  const handlePreviousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => Math.min(pagination.totalPages, prev + 1));
  }, [pagination.totalPages]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [pagination]);

  if (isLoading) {
    return (
      <Container>
        <div className="py-8 md:py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-forest-600"></div>
          <p className="mt-4 text-sm md:text-base text-gray-600">Loading bookings...</p>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Card className="border-2 border-destructive/50">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Error Loading Bookings</h2>
            <p className="text-sm md:text-base text-gray-600">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-24 pb-4 md:pt-28 md:pb-6 lg:pt-32 lg:pb-8">
        {/* Header */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
            Bookings Management
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-600">
            Total bookings: {pagination.total}
          </p>
        </div>

        {/* Bookings Table/Cards */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <AdminBookingsTable bookings={bookings} />
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col gap-4">
            <div className="text-xs md:text-sm text-gray-600 text-center">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(page * ITEMS_PER_PAGE, pagination.total)} of {pagination.total} bookings
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              <div className="flex gap-1 flex-wrap justify-center max-w-full">
                {pageNumbers.map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                    disabled={pageNum === '...'}
                    className={`
                      px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors min-w-[2.5rem] text-center
                      ${
                        pageNum === page
                          ? 'bg-forest-600 text-white'
                          : pageNum === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === pagination.totalPages}
                className="w-full sm:w-auto"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

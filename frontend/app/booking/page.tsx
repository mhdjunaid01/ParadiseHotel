'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BookingForm } from '@/components/booking/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, '', '/booking');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (success) {
    return (
      <div className="py-12 md:py-20 bg-gradient-to-b from-beige-50 to-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-2 border-forest-100 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
                Booking Successful!
              </h1>
              <p className="text-lg text-forest-700 mb-8">
                Your booking has been confirmed. We'll send you a confirmation email shortly.
              </p>
              <Link href="/">
                <Button size="lg" className="bg-forest-600 hover:bg-forest-700 text-white">
                  Return to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <BookingForm />;
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookingPageContent />
    </Suspense>
  );
}



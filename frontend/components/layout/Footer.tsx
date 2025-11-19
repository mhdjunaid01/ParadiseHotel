'use client';

import Link from 'next/link';
import { Container } from '../ui/Container';
import { Separator } from '../ui/separator';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-forest-900 to-forest-950 text-white">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold-400">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <a
                    href="mailto:info@paradiseresort.com"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    info@paradiseresort.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <p className="text-beige-200">
                    123 Paradise Beach Road<br />
                    Tropical Island, TI 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold-400">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#gallery"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/bookings"
                    className="text-beige-200 hover:text-gold-400 transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold-400">Follow Us</h3>
              <p className="text-beige-200 mb-6">
                Stay connected with us on social media for the latest updates and offers.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-forest-800 hover:bg-gold-500 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-forest-800 hover:bg-gold-500 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-forest-800 hover:bg-gold-500 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-12 bg-forest-700" />

          <div className="text-center">
            <p className="text-beige-300">
              © {new Date().getFullYear()} Paradise Resort. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

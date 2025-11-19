'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#gallery', label: 'Gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-md'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link
            href="/"
            className={`text-2xl md:text-3xl font-bold transition-colors ${
              isTransparent ? 'text-white' : 'text-forest-700'
            }`}
          >
            Paradise Resort
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-forest-600 ${
                  isTransparent ? 'text-white/90 hover:text-white' : 'text-forest-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking">
              <Button
                variant="default"
                size="sm"
                className={isTransparent ? 'bg-white text-forest-700 hover:bg-beige-50' : 'bg-forest-600 hover:bg-forest-700 text-white'}
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className={`md:hidden p-2 transition-colors ${
                  isTransparent ? 'text-white' : 'text-forest-700'
                }`}
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-forest-700">
                  Paradise Resort
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-forest-700 hover:text-forest-600 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-4" />
                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full bg-forest-600 hover:bg-forest-700 text-white">
                    Book Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </header>
  );
};

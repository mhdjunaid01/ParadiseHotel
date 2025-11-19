import React from 'react';
import { Container } from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  maxWidth = 'xl',
  id,
}) => {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-20 ${className}`}>
      <Container className={containerClassName} maxWidth={maxWidth}>
        {children}
      </Container>
    </section>
  );
};



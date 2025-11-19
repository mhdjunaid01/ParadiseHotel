'use client';

import { motion } from 'framer-motion';
import { Carousel } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { Container } from '../ui/Container';

interface ServiceSectionProps {
  title: string;
  description: string;
  images: string[];
  imagePosition: 'left' | 'right';
  index: number;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  images,
  imagePosition,
  index,
}) => {
  const isImageLeft = imagePosition === 'left';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: index * 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-beige-50 to-white">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={`
            grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center
            ${isImageLeft ? '' : 'lg:flex-row-reverse'}
          `}
        >
          {/* Image Carousel */}
          <motion.div
            variants={itemVariants}
            className={`
              order-1 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}
              h-[400px] md:h-[500px] lg:h-[600px] w-full
            `}
          >
            <Carousel
              images={images}
              alt={title}
              autoPlay={true}
              autoPlayInterval={4000}
              className="h-full shadow-xl rounded-2xl overflow-hidden"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className={`
              order-2 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}
              flex flex-col justify-center
              px-4 md:px-8 lg:px-12
            `}
          >
            <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8 md:p-10 lg:p-12">
                <motion.h2
                  initial={{ opacity: 0, x: isImageLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-forest-900 mb-6 leading-tight"
                >
                  {title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: isImageLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-forest-700 leading-relaxed"
                >
                  {description}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};






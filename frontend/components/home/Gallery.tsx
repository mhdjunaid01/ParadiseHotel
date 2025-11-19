'use client';

import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Card } from '../ui/card';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    alt: 'Resort pool area',
    title: 'Luxury Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    alt: 'Luxury room',
    title: 'Elegant Suites',
  },
  {
    src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    alt: 'Beach view',
    title: 'Ocean Views',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    alt: 'Spa area',
    title: 'Wellness Spa',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    alt: 'Resort exterior',
    title: 'Mountain Views',
  },
  {
    src: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
    alt: 'Dining area',
    title: 'Fine Dining',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const Gallery = () => {
  return (
    <Section id="gallery" className="bg-gradient-to-b from-white to-beige-50 py-20 md:py-28">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-900 mb-4"
        >
          Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-forest-700 max-w-2xl mx-auto"
        >
          Take a glimpse of our beautiful resort and luxurious amenities
        </motion.p>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {galleryImages.map((image, index) => (
          <motion.div key={index} variants={itemVariants} className="group">
            <Card className="overflow-hidden border-2 border-forest-100 hover:border-forest-300 transition-all duration-300 hover:shadow-2xl bg-white">
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.alt}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

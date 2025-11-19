'use client';

import { ServiceSection } from './ServiceSection';

// Premium resort images from Unsplash
const accommodationImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
];

const adventureImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
];

const wellnessImages = [
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
];

const services = [
  {
    title: 'Accommodation',
    description:
      'Experience unparalleled luxury in our spacious rooms and suites, each thoughtfully designed with stunning views, premium amenities, and world-class comfort. From elegant standard rooms to opulent villas, every space is crafted to provide the ultimate relaxation and rejuvenation during your stay.',
    images: accommodationImages,
    imagePosition: 'left' as const,
  },
  {
    title: 'Adventure Activities',
    description:
      'Embark on thrilling adventures with our curated selection of water sports, hiking trails, and exciting excursions. Whether you seek the rush of water skiing, the serenity of mountain trails, or the excitement of guided expeditions, we offer unforgettable experiences for the adventurous soul.',
    images: adventureImages,
    imagePosition: 'right' as const,
  },
  {
    title: 'Wellness & Spa',
    description:
      'Rejuvenate your mind and body in our tranquil wellness sanctuary. Indulge in premium spa treatments, therapeutic massages, and holistic wellness programs designed to restore balance and harmony. Our expert therapists and serene environment create the perfect escape for complete relaxation and renewal.',
    images: wellnessImages,
    imagePosition: 'left' as const,
  },
];

export const Services = () => {
  return (
    <section id="services" className="bg-gradient-to-b from-white to-beige-50">
      {services.map((service, index) => (
        <ServiceSection
          key={service.title}
          title={service.title}
          description={service.description}
          images={service.images}
          imagePosition={service.imagePosition}
          index={index}
        />
      ))}
    </section>
  );
};

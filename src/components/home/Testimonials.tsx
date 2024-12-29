import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    content: "This platform has revolutionized how I study for medical exams. The AI-generated quizzes are incredibly relevant and help me identify knowledge gaps.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Law Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    content: "The essay evaluation feature has significantly improved my legal writing. The feedback is detailed and actionable.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "High School Teacher",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    content: "I use this with my students to create interactive study materials. It's made my job easier and my students love it!",
    rating: 5
  }
];

const Testimonials = () => (
  <section className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ 
  name, 
  role, 
  image, 
  content, 
  rating 
}: {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
      </div>
    </div>
    
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    
    <p className="text-gray-600 dark:text-gray-300">{content}</p>
  </div>
);

export default Testimonials;
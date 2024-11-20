import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { services } from '../lib/services';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export default function Services() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h1>
      
      {/* Servicios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{service.duration} minutos</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <DollarSign className="w-5 h-5 mr-1" />
                  <span>{formatPrice(service.price)}</span>
                </div>
              </div>
              
              <Link
                to="/booking"
                className="block w-full bg-rose-500 text-white text-center py-3 rounded-lg hover:bg-rose-600 transition-colors"
              >
                Reservar Cita
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Galería de Trabajos */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Galería de Trabajos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Maquillaje social profesional',
              category: 'Maquillaje Social'
            },
            {
              src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Limpieza facial',
              category: 'Limpieza Facial'
            },
            {
              src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Tratamiento hidratante',
              category: 'Limpieza Facial + Hidratación'
            },
            {
              src: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Ondas y rizos',
              category: 'Ondas Crespos'
            },
            {
              src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Pestañas punto a punto',
              category: 'Pestañas'
            },
            {
              src: 'https://images.unsplash.com/photo-1594076456781-a20ffc5e5f4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
              alt: 'Diseño de cejas',
              category: 'Cejas'
            }
          ].map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white text-lg font-medium mb-2">{image.category}</span>
                <span className="text-white text-sm">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
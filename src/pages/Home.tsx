import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Calendar, Star } from 'lucide-react';
import { services } from '../lib/services';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-cover bg-center" style={{
        backgroundImage: 'url("https://equalsaludybelleza.com/wp-content/uploads/2023/07/Limpieza-facial-para-hombres-1.jpg")'
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Transforma tu Belleza Natural</h1>
            <p className="text-xl mb-8">Experimenta nuestros servicios profesionales de belleza diseñados especialmente para ti. Reserva tu cita hoy.</p>
            <Link to="/booking" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Reservar Cita
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Servicios Expertos</h3>
              <p className="text-gray-600">Tratamientos profesionales por expertos certificados</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horarios Flexibles</h3>
              <p className="text-gray-600">Programación conveniente para tu estilo de vida</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Productos Premium</h3>
              <p className="text-gray-600">Utilizamos solo productos de belleza de la más alta calidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-rose-500 font-medium mb-4">{formatPrice(service.price)}</p>
                  <Link to="/booking" className="text-rose-500 hover:text-rose-600 font-medium">
                    Reservar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
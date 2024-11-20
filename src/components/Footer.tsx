import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Maria Fernanda Salud y Belleza</h3>
            <p className="text-gray-400">Transformando tu belleza natural con servicios profesionales y productos de primera calidad.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-500" />
                <span>fernandaalzate165@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-500" />
                <span>+57 311 6763975</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>Medellín, Colombia</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Horario</h3>
            <div className="space-y-2">
              <p>Lunes - Viernes: 9:00 - 20:00</p>
              <p>Sábado: 10:00 - 18:00</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
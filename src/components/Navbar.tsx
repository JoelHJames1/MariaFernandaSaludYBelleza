import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-800">Maria Fernanda Salud y Belleza</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rose-500">Inicio</Link>
            <Link to="/services" className="text-gray-600 hover:text-rose-500">Servicios</Link>
            <Link to="/booking" className="text-gray-600 hover:text-rose-500">Reservar Cita</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-rose-500">Panel Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
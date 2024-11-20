import React, { useEffect, useState } from 'react';
import { useAppointmentStore } from '../store/appointmentStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Mail, Phone, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { appointments, fetchAppointments } = useAppointmentStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'today') {
      return format(new Date(appointment.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    }
    if (filter === 'upcoming') {
      return new Date(appointment.date) > new Date();
    }
    return true;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <Link
          to="/settings"
          className="flex items-center text-gray-600 hover:text-rose-500"
        >
          <Settings className="w-5 h-5 mr-2" />
          Configuración
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-8">
        <div className="flex space-x-4">
          {['all', 'today', 'upcoming'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg ${
                filter === filterOption
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption === 'all' && 'Todas las Citas'}
              {filterOption === 'today' && 'Hoy'}
              {filterOption === 'upcoming' && 'Próximas'}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Citas */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium">
          <div>Fecha</div>
          <div>Hora</div>
          <div>Servicio</div>
          <div>Cliente</div>
          <div>Contacto</div>
          <div>Estado</div>
        </div>
        <div className="divide-y">
          {filteredAppointments.map((appointment, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-rose-500" />
                {format(new Date(appointment.date), 'dd/MM/yyyy', { locale: es })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-rose-500" />
                {appointment.time}
              </div>
              <div>{appointment.service}</div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-rose-500" />
                {appointment.name}
              </div>
              <div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-rose-500" />
                  {appointment.email}
                </div>
                <div className="flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2 text-rose-500" />
                  {appointment.phone}
                </div>
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Confirmada
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppointmentStore } from '../store/appointmentStore';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { services } from '../lib/services';

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00'
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const { createAppointment } = useAppointmentStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService) return;

    setLoading(true);
    try {
      const service = services.find(s => s.name === selectedService);
      const appointmentData = {
        service: selectedService,
        serviceDetails: service,
        date: selectedDate,
        time: selectedTime,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        status: 'pending',
        businessEmail: 'fernandaalzate165@gmail.com',
        createdAt: new Date()
      };

      await createAppointment(appointmentData);

      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setSelectedService('');
      setFormData({ name: '', email: '', phone: '' });
      
      alert('¡Cita agendada con éxito! Te hemos enviado un correo de confirmación.');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error al agendar la cita. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Agenda tu Cita</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Servicios */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-rose-500" />
              Selecciona el Servicio
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service.name)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedService === service.name
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600">
                    {service.duration} min • {formatPrice(service.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fecha */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-rose-500" />
              Selecciona la Fecha
            </h2>
            <div className="border rounded-lg p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={es}
                fromDate={new Date()}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Hora */}
          {selectedDate && (
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-rose-500" />
                Selecciona la Hora
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 border rounded-lg text-center transition-colors ${
                      selectedTime === time
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Datos personales */}
          {selectedTime && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Tus Datos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botón de envío */}
          {selectedService && selectedDate && selectedTime && (
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-rose-500 text-white py-3 px-6 rounded-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-600'
              }`}
            >
              {loading ? 'Procesando...' : 'Confirmar Cita'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
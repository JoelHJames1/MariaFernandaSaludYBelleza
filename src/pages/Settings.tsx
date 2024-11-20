import React, { useState } from 'react';
import { Upload, Save } from 'lucide-react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Settings() {
  const [logo, setLogo] = useState<File | null>(null);
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Maria Fernanda Salud y Belleza',
    address: '',
    phone: '',
    email: 'fernandaalzate165@gmail.com'
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `logos/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      console.log('Logo uploaded:', url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save business info to Firebase
    console.log('Business info saved:', businessInfo);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo del Negocio
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-rose-500 hover:text-rose-400">
                    <span>Subir logo</span>
                    <input
                      id="logo-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG hasta 2MB</p>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Negocio
              </label>
              <input
                type="text"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-rose-500 text-white py-2 px-4 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <Save className="w-5 h-5 mr-2" />
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
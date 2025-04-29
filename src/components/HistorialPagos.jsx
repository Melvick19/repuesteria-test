import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const HistorialPagos = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [pagos, setPagos] = useState([
    {
      id: 1,
      proveedor: 'Repuestos AutoPlus',
      telefono: '0412-1234567',
      comprador: 'Juan Pérez',
      referencia: 'REF-001',
      fecha: '2024-03-15',
      hora: '14:30',
      monto: 150.00
    },
    {
      id: 2,
      proveedor: 'Autopartes Express',
      telefono: '0414-7654321',
      comprador: 'María González',
      referencia: 'REF-002',
      fecha: '2024-03-15',
      hora: '15:45',
      monto: 275.50
    },
    {
      id: 3,
      proveedor: 'Mecánica Rápida',
      telefono: '0424-9876543',
      comprador: 'Carlos Rodríguez',
      referencia: 'REF-003',
      fecha: '2024-03-16',
      hora: '09:15',
      monto: 420.75
    },
    {
      id: 4,
      proveedor: 'Taller Eléctrico',
      telefono: '0416-4567890',
      comprador: 'Ana Martínez',
      referencia: 'REF-004',
      fecha: '2024-03-16',
      hora: '11:30',
      monto: 180.25
    },
    {
      id: 5,
      proveedor: 'Frenos y Embragues',
      telefono: '0426-3210987',
      comprador: 'Luis Hernández',
      referencia: 'REF-005',
      fecha: '2024-03-17',
      hora: '16:20',
      monto: 350.00
    },
    {
      id: 6,
      proveedor: 'Suspensión Total',
      telefono: '0412-5556666',
      comprador: 'Pedro Sánchez',
      referencia: 'REF-006',
      fecha: '2024-03-17',
      hora: '10:45',
      monto: 280.50
    },
    {
      id: 7,
      proveedor: 'Aceites y Lubricantes',
      telefono: '0424-7778888',
      comprador: 'Laura Díaz',
      referencia: 'REF-007',
      fecha: '2024-03-18',
      hora: '13:15',
      monto: 95.75
    },
    {
      id: 8,
      proveedor: 'Baterías Express',
      telefono: '0416-9990000',
      comprador: 'Roberto Vargas',
      referencia: 'REF-008',
      fecha: '2024-03-18',
      hora: '15:30',
      monto: 120.00
    },
    {
      id: 9,
      proveedor: 'Neumáticos Pro',
      telefono: '0426-1112222',
      comprador: 'Sofía Mendoza',
      referencia: 'REF-009',
      fecha: '2024-03-19',
      hora: '09:45',
      monto: 450.25
    },
    {
      id: 10,
      proveedor: 'Carrocería Express',
      telefono: '0412-3334444',
      comprador: 'Diego Rojas',
      referencia: 'REF-010',
      fecha: '2024-03-19',
      hora: '14:20',
      monto: 320.50
    }
  ]);

  const handleFechaChange = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  const handleDescargarExcel = () => {
    // Aquí iría la lógica para generar y descargar el archivo Excel
    console.log('Descargando lista de pagos en Excel...');
  };

  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2
    }).format(monto);
  };

  const pagosFiltrados = fechaSeleccionada
    ? pagos.filter(pago => pago.fecha === fechaSeleccionada)
    : pagos;

  return (
    <div className="w-full max-w-[1920px] aspect-[16/9] p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Historial de Pagos</h2>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por fecha
              </label>
              <input
                type="date"
                value={fechaSeleccionada}
                onChange={handleFechaChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleDescargarExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
            >
              <FaDownload className="mr-2" />
              Descargar Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comprador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pagosFiltrados.map((pago) => (
                <tr key={pago.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.comprador}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.referencia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {pago.fecha} {pago.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatMonto(pago.monto)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialPagos; 
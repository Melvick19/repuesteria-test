import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Datos dummy de uso de etiquetas
const estadisticasEtiquetas = {
  1: { // CHEVROLET
    vendedoresUsando: 12,
    usoEnSolicitudes: 458
  },
  2: { // TOYOTA
    vendedoresUsando: 15,
    usoEnSolicitudes: 623
  },
  3: { // FORD
    vendedoresUsando: 8,
    usoEnSolicitudes: 312
  },
  4: { // MAZDA
    vendedoresUsando: 6,
    usoEnSolicitudes: 245
  },
  5: { // FRENOS
    vendedoresUsando: 25,
    usoEnSolicitudes: 892
  },
  6: { // TREN DELANTERO
    vendedoresUsando: 18,
    usoEnSolicitudes: 567
  },
  7: { // MOTOR
    vendedoresUsando: 22,
    usoEnSolicitudes: 789
  },
  8: { // CORREAS
    vendedoresUsando: 14,
    usoEnSolicitudes: 432
  },
  9: { // EMPAQUES
    vendedoresUsando: 16,
    usoEnSolicitudes: 523
  },
  10: { // AUTOPERIQUITOS
    vendedoresUsando: 10,
    usoEnSolicitudes: 234
  },
  11: { // ELECTROAUTO
    vendedoresUsando: 20,
    usoEnSolicitudes: 678
  }
};

export const CrearEtiquetas = () => {
  const [etiquetas, setEtiquetas] = useState([
    {
      id: 1,
      nombre: 'CHEVROLET',
      descripcion: 'Repuestos para Chevrolet'
    },
    {
      id: 2,
      nombre: 'TOYOTA',
      descripcion: 'Todo para Toyota'
    },
    {
      id: 3,
      nombre: 'FORD',
      descripcion: 'Repuestos y accesorios Ford'
    },
    {
      id: 4,
      nombre: 'MAZDA',
      descripcion: 'Repuestos y accesorios Mazda'
    },
    {
      id: 5,
      nombre: 'FRENOS',
      descripcion: 'Sistema de frenos y componentes'
    },
    {
      id: 6,
      nombre: 'TREN DELANTERO',
      descripcion: 'Componentes de dirección y suspensión'
    },
    {
      id: 7,
      nombre: 'MOTOR',
      descripcion: 'Componentes y repuestos del motor'
    },
    {
      id: 8,
      nombre: 'CORREAS',
      descripcion: 'Correas de transmisión y accesorios'
    },
    {
      id: 9,
      nombre: 'EMPAQUES',
      descripcion: 'Juntas y empaques para sellado'
    },
    {
      id: 10,
      nombre: 'AUTOPERIQUITOS',
      descripcion: 'Accesorios y repuestos varios'
    },
    {
      id: 11,
      nombre: 'ELECTROAUTO',
      descripcion: 'Componentes eléctricos y electrónicos'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState({
    nombre: '',
    descripcion: ''
  });

  const handleEdit = (etiqueta) => {
    // Aquí iría la lógica para editar la etiqueta
    console.log('Editar etiqueta:', etiqueta);
  };

  const handleDelete = (id) => {
    // Aquí iría la lógica para eliminar la etiqueta
    setEtiquetas(prev => prev.filter(etiqueta => etiqueta.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaEtiqueta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaEtiqueta.nombre && nuevaEtiqueta.descripcion) {
      const nuevaEtiquetaConId = {
        ...nuevaEtiqueta,
        id: etiquetas.length + 1
      };
      setEtiquetas(prev => [...prev, nuevaEtiquetaConId]);
      setNuevaEtiqueta({ nombre: '', descripcion: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Etiquetas</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus /> Crear Etiqueta
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedores Usando</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uso en Solicitudes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {etiquetas.map((etiqueta) => (
                <tr key={etiqueta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {etiqueta.nombre}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{etiqueta.descripcion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {estadisticasEtiquetas[etiqueta.id].vendedoresUsando}
                      </div>
                      <div className="ml-2 text-xs text-gray-500">vendedores</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((estadisticasEtiquetas[etiqueta.id].vendedoresUsando / 30) * 100)}% del total
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {estadisticasEtiquetas[etiqueta.id].usoEnSolicitudes.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">solicitudes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(etiqueta)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(etiqueta.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear/editar etiqueta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Crear Nueva Etiqueta</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nuevaEtiqueta.nombre}
                  onChange={(e) => setNuevaEtiqueta(prev => ({ ...prev, nombre: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={nuevaEtiqueta.descripcion}
                  onChange={(e) => setNuevaEtiqueta(prev => ({ ...prev, descripcion: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 
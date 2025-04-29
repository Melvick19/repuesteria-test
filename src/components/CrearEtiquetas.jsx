import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
    <div className="w-full max-w-[1920px] aspect-[16/9] p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Etiquetas de Proveedores</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FaPlus className="mr-2" />
            Crear Nueva Etiqueta
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etiqueta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {etiquetas.map((etiqueta) => (
                <tr key={etiqueta.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {etiqueta.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {etiqueta.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(etiqueta)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Editar"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(etiqueta.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para crear nueva etiqueta */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Crear Nueva Etiqueta</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de la Etiqueta
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nuevaEtiqueta.nombre}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={nuevaEtiqueta.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Crear Etiqueta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 
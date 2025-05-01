import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Administradores = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    cedula: '',
    rol: '',
    email: '',
    telefono: '',
    fechaNacimiento: ''
  });

  // Lista dummy de administradores
  const [administradores, setAdministradores] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '0412-1234567',
      rol: 'Administrador',
      email: 'juan.perez@empresa.com',
      fechaCreacion: '2023-08-15'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      telefono: '0424-7654321',
      rol: 'Soporte Chat',
      email: 'maria.gonzalez@empresa.com',
      fechaCreacion: '2023-09-22'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      telefono: '0416-9876543',
      rol: 'Otros',
      email: 'carlos.rodriguez@empresa.com',
      fechaCreacion: '2023-10-05'
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Martínez',
      telefono: '0426-4567890',
      rol: 'Administrador',
      email: 'ana.martinez@empresa.com',
      fechaCreacion: '2023-11-12'
    },
    {
      id: 5,
      nombre: 'Luis',
      apellido: 'Hernández',
      telefono: '0414-3210987',
      rol: 'Soporte Chat',
      email: 'luis.hernandez@empresa.com',
      fechaCreacion: '2023-12-01'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del administrador:', formData);
    setShowModal(false);
    setFormData({
      nombreCompleto: '',
      cedula: '',
      rol: '',
      email: '',
      telefono: '',
      fechaNacimiento: ''
    });
  };

  const handleEdit = (admin) => {
    // Aquí iría la lógica para editar el administrador
    console.log('Editar administrador:', admin);
  };

  const handleDelete = (id) => {
    // Aquí iría la lógica para eliminar el administrador
    setAdministradores(prev => prev.filter(admin => admin.id !== id));
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Administradores</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus /> Crear Administrador
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {administradores.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${admin.nombre} ${admin.apellido}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{admin.telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600 hover:text-blue-800">
                      <a href={`mailto:${admin.email}`}>{admin.email}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      admin.rol === 'Administrador' 
                        ? 'bg-purple-100 text-purple-800'
                        : admin.rol === 'Soporte Chat'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {admin.rol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatFecha(admin.fechaCreacion)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
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

      {/* Modal para crear/editar administrador */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Crear Nuevo Administrador</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rol
                </label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Soporte Chat">Soporte Chat</option>
                  <option value="Otros">Otros</option>
                </select>
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

export default Administradores; 
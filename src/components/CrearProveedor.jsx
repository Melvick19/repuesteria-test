import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { StarIcon } from '@heroicons/react/24/solid';
import { etiquetasDisponibles } from '../data/etiquetas';

const CrearProveedor = () => {
  const [showModal, setShowModal] = useState(false);
  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    nombreTienda: false,
    rifCedula: false
  });
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    apellido: '',
    nombreTienda: '',
    rifCedula: '',
    etiquetas: [],
    reputacion: 5
  });
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

  // Datos de ejemplo para los proveedores
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellido: '+58 424-1234567',
      nombreTienda: 'Repuestos J&P',
      rifCedula: 'V-12345678',
      telefono: '+58 424-1234567',
      reputacion: 4,
      etiquetas: [1, 5, 6] // CHEVROLET, FRENOS, TREN DELANTERO
    },
    {
      id: 2,
      nombre: 'María',
      apellido: '+58 414-7654321',
      nombreTienda: 'Auto Parts MG',
      rifCedula: 'J-87654321',
      telefono: '+58 414-7654321',
      reputacion: 5,
      etiquetas: [2, 7] // TOYOTA, MOTOR
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: '+58 412-9876543',
      nombreTienda: 'AutoRepuestos El Experto',
      rifCedula: 'V-98765432',
      telefono: '+58 412-9876543',
      reputacion: 5,
      etiquetas: [3, 8, 9] // FORD, CORREAS, EMPAQUES
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: '+58 416-4567890',
      nombreTienda: 'Repuestos Express',
      rifCedula: 'V-45678901',
      telefono: '+58 416-4567890',
      reputacion: 3,
      etiquetas: [4, 11] // MAZDA, ELECTROAUTO
    },
    {
      id: 5,
      nombre: 'Pedro',
      apellido: '+58 424-7890123',
      nombreTienda: 'Todo Repuestos',
      rifCedula: 'J-78901234',
      telefono: '+58 424-7890123',
      reputacion: 4,
      etiquetas: [2, 5, 10] // TOYOTA, FRENOS, AUTOPERIQUITOS
    },
    {
      id: 6,
      nombre: 'Laura',
      apellido: '+58 414-3456789',
      nombreTienda: 'Autopartes del Este',
      rifCedula: 'V-34567890',
      telefono: '+58 414-3456789',
      reputacion: 5,
      etiquetas: [1, 7, 11] // CHEVROLET, MOTOR, ELECTROAUTO
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleEtiquetaChange = (id) => {
    setEtiquetasSeleccionadas(prev => {
      if (prev.includes(id)) {
        return prev.filter(etiquetaId => etiquetaId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleReputacionChange = (valor) => {
    setNuevoProveedor(prev => ({
      ...prev,
      reputacion: valor
    }));
  };

  const validarCampos = () => {
    const nuevosErrores = {
      nombre: nuevoProveedor.nombre.trim() === '',
      apellido: nuevoProveedor.apellido.trim() === '',
      nombreTienda: nuevoProveedor.nombreTienda.trim() === '',
      rifCedula: nuevoProveedor.rifCedula.trim() === ''
    };
    
    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarCampos()) {
      return; // Si hay errores, no continuar con la creación
    }

    const nuevoId = Math.max(...proveedores.map(p => p.id)) + 1;
    setProveedores([...proveedores, {
      ...nuevoProveedor,
      id: nuevoId,
      direccion: 'Dirección por defecto',
    }]);
    setShowModal(false);
    setNuevoProveedor({
      nombre: '',
      apellido: '',
      nombreTienda: '',
      rifCedula: '',
      etiquetas: [],
      reputacion: 5
    });
    setErrores({
      nombre: false,
      apellido: false,
      nombreTienda: false,
      rifCedula: false
    });
  };

  const handleDelete = (id) => {
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  const handleEdit = (id) => {
    // Implementar lógica de edición
    console.log('Editar proveedor:', id);
  };

  return (
    <div className="w-full max-w-[1920px] aspect-[16/9] p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Proveedores</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus /> Crear Proveedor
          </button>
        </div>

        {/* Tabla de proveedores */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tienda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RIF/Cédula</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reputación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etiquetas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{proveedor.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proveedor.nombreTienda}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proveedor.rifCedula}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proveedor.apellido}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < proveedor.reputacion ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {proveedor.etiquetas.map((etiquetaId) => {
                        const etiqueta = etiquetasDisponibles.find(e => e.id === etiquetaId);
                        return etiqueta ? (
                          <span
                            key={etiqueta.id}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {etiqueta.nombre}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(proveedor.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proveedor.id)}
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

        {/* Modal para crear proveedor */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
              {/* Encabezado fijo */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold">Crear Nuevo Proveedor</h3>
              </div>

              {/* Contenido con scroll */}
              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre y Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={nuevoProveedor.nombre}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                        errores.nombre 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errores.nombre && (
                      <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Número de Teléfono (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="apellido"
                      value={nuevoProveedor.apellido}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                        errores.apellido 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errores.apellido && (
                      <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre de Tienda <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombreTienda"
                      value={nuevoProveedor.nombreTienda}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                        errores.nombreTienda 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errores.nombreTienda && (
                      <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      RIF o Cédula <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="rifCedula"
                      value={nuevoProveedor.rifCedula}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                        errores.rifCedula 
                          ? 'border-red-500 focus:border-red-500 bg-red-50' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errores.rifCedula && (
                      <p className="mt-1 text-sm text-red-500">Este campo es requerido</p>
                    )}
                  </div>
                  {/* Sección de etiquetas con checkboxes */}
                  <div className="mb-4 max-h-40 overflow-y-auto">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Etiquetas
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {etiquetasDisponibles.map((etiqueta) => (
                        <div key={etiqueta.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`etiqueta-${etiqueta.id}`}
                            checked={etiquetasSeleccionadas.includes(etiqueta.id)}
                            onChange={() => handleEtiquetaChange(etiqueta.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`etiqueta-${etiqueta.id}`}
                            className="ml-2 block text-sm text-gray-900"
                          >
                            {etiqueta.nombre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Reputación con estrellas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reputación</label>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handleReputacionChange(i + 1)}
                          className="focus:outline-none"
                          tabIndex={-1}
                        >
                          <StarIcon
                            className={`h-7 w-7 ${i < nuevoProveedor.reputacion ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              {/* Pie fijo con botones */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Crear Proveedor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearProveedor; 
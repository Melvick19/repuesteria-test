import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { StarIcon } from '@heroicons/react/24/solid';
import { etiquetasDisponibles } from '../data/etiquetas';

// Datos dummy del historial de proveedores
const historialProveedores = {
  1: {
    fechaIngreso: '2023-09-15',
    ventasConcretadas: 45,
    ventasNoConcretadas: 12,
    ventasEnProceso: 8,
    intervencionesHumanas: 23,
    sinIntervencion: 157,
    diasActivo: 120,
    diasNoActivo: 15,
    solicitudesRecibidas: 180,
    solicitudesPositivas: 150,
    solicitudesNegativas: 30
  },
  2: {
    fechaIngreso: '2023-10-03',
    ventasConcretadas: 38,
    ventasNoConcretadas: 15,
    ventasEnProceso: 5,
    intervencionesHumanas: 18,
    sinIntervencion: 132,
    diasActivo: 95,
    diasNoActivo: 10,
    solicitudesRecibidas: 150,
    solicitudesPositivas: 120,
    solicitudesNegativas: 30
  },
  3: {
    fechaIngreso: '2023-08-22',
    ventasConcretadas: 52,
    ventasNoConcretadas: 8,
    ventasEnProceso: 12,
    intervencionesHumanas: 30,
    sinIntervencion: 170,
    diasActivo: 150,
    diasNoActivo: 5,
    solicitudesRecibidas: 200,
    solicitudesPositivas: 180,
    solicitudesNegativas: 20
  },
  4: {
    fechaIngreso: '2023-11-08',
    ventasConcretadas: 28,
    ventasNoConcretadas: 20,
    ventasEnProceso: 6,
    intervencionesHumanas: 15,
    sinIntervencion: 105,
    diasActivo: 80,
    diasNoActivo: 25,
    solicitudesRecibidas: 120,
    solicitudesPositivas: 90,
    solicitudesNegativas: 30
  },
  5: {
    fechaIngreso: '2023-09-30',
    ventasConcretadas: 42,
    ventasNoConcretadas: 10,
    ventasEnProceso: 7,
    intervencionesHumanas: 25,
    sinIntervencion: 145,
    diasActivo: 110,
    diasNoActivo: 12,
    solicitudesRecibidas: 170,
    solicitudesPositivas: 140,
    solicitudesNegativas: 30
  },
  6: {
    fechaIngreso: '2023-10-15',
    ventasConcretadas: 35,
    ventasNoConcretadas: 18,
    ventasEnProceso: 9,
    intervencionesHumanas: 20,
    sinIntervencion: 140,
    diasActivo: 100,
    diasNoActivo: 15,
    solicitudesRecibidas: 160,
    solicitudesPositivas: 130,
    solicitudesNegativas: 30
  }
};

const CrearProveedor = () => {
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorActual, setProveedorActual] = useState(null);
  const [proveedorExpandido, setProveedorExpandido] = useState(null);
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
      nombre: 'Juan Perez',
      apellido: '+58 424-1234567',
      nombreTienda: 'Repuestos J&P',
      rifCedula: 'V-12345678',
      telefono: '+58 424-1234567',
      reputacion: 4,
      etiquetas: [1, 5, 6] // CHEVROLET, FRENOS, TREN DELANTERO
    },
    {
      id: 2,
      nombre: 'María Garcia',
      apellido: '+58 414-7654321',
      nombreTienda: 'Auto Parts MG',
      rifCedula: 'J-87654321',
      telefono: '+58 414-7654321',
      reputacion: 5,
      etiquetas: [2, 7] // TOYOTA, MOTOR
    },
    {
      id: 3,
      nombre: 'Carlos Lopez',
      apellido: '+58 412-9876543',
      nombreTienda: 'AutoRepuestos El Experto',
      rifCedula: 'V-98765432',
      telefono: '+58 412-9876543',
      reputacion: 5,
      etiquetas: [3, 8, 9] // FORD, CORREAS, EMPAQUES
    },
    {
      id: 4,
      nombre: 'Ana Torres',
      apellido: '+58 416-4567890',
      nombreTienda: 'Repuestos Express',
      rifCedula: 'V-45678901',
      telefono: '+58 416-4567890',
      reputacion: 3,
      etiquetas: [4, 11] // MAZDA, ELECTROAUTO
    },
    {
      id: 5,
      nombre: 'Pedro Ramirez',
      apellido: '+58 424-7890123',
      nombreTienda: 'Todo Repuestos',
      rifCedula: 'J-78901234',
      telefono: '+58 424-7890123',
      reputacion: 4,
      etiquetas: [2, 5, 10] // TOYOTA, FRENOS, AUTOPERIQUITOS
    },
    {
      id: 6,
      nombre: 'Laura Martinez',
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
      return;
    }

    if (modoEdicion && proveedorActual) {
      // Actualizar proveedor existente
      setProveedores(proveedores.map(p => 
        p.id === proveedorActual.id 
          ? { ...nuevoProveedor, id: proveedorActual.id }
          : p
      ));
    } else {
      // Crear nuevo proveedor
      const nuevoId = Math.max(...proveedores.map(p => p.id)) + 1;
      setProveedores([...proveedores, {
        ...nuevoProveedor,
        id: nuevoId,
        direccion: 'Dirección por defecto',
        etiquetas: etiquetasSeleccionadas,
        telefono: nuevoProveedor.apellido
      }]);
    }

    setShowModal(false);
    setNuevoProveedor({
      nombre: '',
      apellido: '',
      nombreTienda: '',
      rifCedula: '',
      etiquetas: [],
      reputacion: 5
    });
    setEtiquetasSeleccionadas([]);
    setErrores({
      nombre: false,
      apellido: false,
      nombreTienda: false,
      rifCedula: false
    });
    setModoEdicion(false);
    setProveedorActual(null);
  };

  const handleDelete = (id) => {
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  const handleEdit = (id) => {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
      setProveedorActual(proveedor);
      setNuevoProveedor({
        nombre: proveedor.nombre,
        apellido: proveedor.apellido,
        nombreTienda: proveedor.nombreTienda,
        rifCedula: proveedor.rifCedula,
        etiquetas: proveedor.etiquetas,
        reputacion: proveedor.reputacion
      });
      setEtiquetasSeleccionadas(proveedor.etiquetas);
      setModoEdicion(true);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNuevoProveedor({
      nombre: '',
      apellido: '',
      nombreTienda: '',
      rifCedula: '',
      etiquetas: [],
      reputacion: 5
    });
    setEtiquetasSeleccionadas([]);
    setErrores({
      nombre: false,
      apellido: false,
      nombreTienda: false,
      rifCedula: false
    });
    setModoEdicion(false);
    setProveedorActual(null);
  };

  const toggleProveedorExpandido = (id) => {
    setProveedorExpandido(proveedorExpandido === id ? null : id);
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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Lista de Proveedores</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RIF/Cédula</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reputación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etiquetas</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {proveedores.map((proveedor) => (
                  <>
                    <tr key={proveedor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleProveedorExpandido(proveedor.id)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            {proveedorExpandido === proveedor.id ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                          <button
                            onClick={() => handleEdit(proveedor.id)}
                            className="p-1 text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(proveedor.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{proveedor.nombreTienda}</div>
                        <div className="text-sm text-gray-500">{proveedor.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.telefono}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.rifCedula}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
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
                        <div className="flex flex-wrap gap-1">
                          {proveedor.etiquetas.map((etiquetaId) => {
                            const etiqueta = etiquetasDisponibles.find(e => e.id === etiquetaId);
                            return etiqueta ? (
                              <span
                                key={etiquetaId}
                                className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                              >
                                {etiqueta.nombre}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </td>
                    </tr>
                    {proveedorExpandido === proveedor.id && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div className="text-center mb-4">
                            <p className="text-sm text-gray-600">
                              Fecha de ingreso: <span className="font-medium">{new Date(historialProveedores[proveedor.id].fechaIngreso).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}</span>
                            </p>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-sm font-medium text-gray-500">Ventas</h3>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-green-600">Concretadas: {historialProveedores[proveedor.id].ventasConcretadas}</p>
                                <p className="text-sm text-red-600">No Concretadas: {historialProveedores[proveedor.id].ventasNoConcretadas}</p>
                                <p className="text-sm text-blue-600">En Proceso: {historialProveedores[proveedor.id].ventasEnProceso}</p>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-sm font-medium text-gray-500">Chats</h3>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-purple-600">Con Intervención: {historialProveedores[proveedor.id].intervencionesHumanas}</p>
                                <p className="text-sm text-blue-600">Sin Intervención: {historialProveedores[proveedor.id].sinIntervencion}</p>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-sm font-medium text-gray-500">Actividad</h3>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-green-600">Días Activo: {historialProveedores[proveedor.id].diasActivo}</p>
                                <p className="text-sm text-red-600">Días No Activo: {historialProveedores[proveedor.id].diasNoActivo}</p>
                              </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                              <h3 className="text-sm font-medium text-gray-500">Solicitudes</h3>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-gray-600">Recibidas: {historialProveedores[proveedor.id].solicitudesRecibidas}</p>
                                <p className="text-sm text-green-600">Positivas: {historialProveedores[proveedor.id].solicitudesPositivas}</p>
                                <p className="text-sm text-red-600">Negativas: {historialProveedores[proveedor.id].solicitudesNegativas}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
            {/* Encabezado fijo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {modoEdicion ? 'Editar Proveedor' : 'Crear Nuevo Proveedor'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
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
                  <div className="flex items-center justify-center gap-1">
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
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {modoEdicion ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearProveedor; 
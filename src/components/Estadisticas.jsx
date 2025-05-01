import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaUsers, FaMoneyBillWave, FaTags, FaCheckCircle, FaExclamationTriangle, FaServer } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export const Estadisticas = () => {
  const [periodo, setPeriodo] = useState('mes');
  const [data, setData] = useState([
    {
      name: 'API IA Compradores',
      latencia: 145,
      solicitudes: 2850,
      errores: 12,
      status: 'online',
      historial: {
        latencias: [145, 152, 138, 142, 149, 155, 143],
        solicitudes: [2850, 2720, 2930, 2840, 2760, 2890, 2800],
        errores: [12, 8, 15, 10, 9, 11, 14]
      }
    },
    {
      name: 'API IA Proveedores',
      latencia: 168,
      solicitudes: 1920,
      errores: 8,
      status: 'online',
      historial: {
        latencias: [168, 172, 165, 170, 175, 162, 168],
        solicitudes: [1920, 1850, 1980, 1890, 1940, 1870, 1900],
        errores: [8, 6, 9, 7, 8, 10, 5]
      }
    },
    {
      name: 'API WhatsApp',
      latencia: 98,
      solicitudes: 5200,
      errores: 3,
      status: 'online',
      historial: {
        latencias: [98, 102, 95, 97, 100, 96, 99],
        solicitudes: [5200, 5150, 5300, 5180, 5250, 5220, 5190],
        errores: [3, 2, 4, 3, 2, 3, 2]
      }
    }
  ]);

  const datosEstadisticas = {
    proveedores: {
      total: 150,
      activos: 120,
      nuevos: 15
    },
    pagos: {
      total: 25000,
      promedio: 8500,
      pendientes: 5
    },
    etiquetas: {
      total: 45,
      masUsadas: ['Repuestos', 'Accesorios', 'Lubricantes']
    }
  };

  // Datos de ejemplo para las gráficas
  const datosVentas = {
    labels: ['Concretadas', 'No Concretadas', 'En Proceso'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)', // Verde para concretadas
        'rgba(239, 68, 68, 0.8)', // Rojo para no concretadas
        'rgba(59, 130, 246, 0.8)' // Azul para en proceso
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(59, 130, 246, 1)'
      ],
      borderWidth: 1
    }]
  };

  const datosProveedores = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Proveedores Activos',
      data: [52, 62, 70, 86, 99, 118, 143],
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  const datosVentasDiarias = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Ventas Concretadas',
      data: [12, 15, 8, 10, 14, 9, 11],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1
    }, {
      label: 'Ventas No Concretadas',
      data: [3, 4, 2, 5, 3, 4, 2],
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1
    }]
  };

  const opcionesPie = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };

  const opcionesLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const opcionesBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Simular actualizaciones en tiempo real con variaciones más realistas
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => prevData.map(item => {
        // Calcular nuevos valores basados en rangos realistas
        const newLatencia = Math.max(50, Math.min(300, item.latencia + (Math.random() * 20 - 10)));
        const newSolicitudes = item.solicitudes + Math.floor(Math.random() * 50);
        const newErrores = Math.max(0, item.errores + (Math.random() > 0.85 ? 1 : Math.random() > 0.95 ? -1 : 0));
        
        // Actualizar historial
        const newHistorial = {
          latencias: [...item.historial.latencias.slice(1), newLatencia],
          solicitudes: [...item.historial.solicitudes.slice(1), newSolicitudes],
          errores: [...item.historial.errores.slice(1), newErrores]
        };

        return {
          ...item,
          latencia: Math.round(newLatencia),
          solicitudes: newSolicitudes,
          errores: newErrores,
          status: Math.random() > 0.95 ? 'warning' : 'online',
          historial: newHistorial
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return '#25D366';
      case 'warning':
        return '#FFB800';
      case 'offline':
        return '#DC3545';
      default:
        return '#999';
    }
  };

  const StatusIndicator = ({ status }) => (
    <div className="flex items-center gap-2">
      {status === 'online' ? (
        <FaCheckCircle className="text-[#25D366]" />
      ) : status === 'warning' ? (
        <FaExclamationTriangle className="text-[#FFB800]" />
      ) : (
        <FaServer className="text-[#DC3545]" />
      )}
      <span className="capitalize">{status}</span>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">{label}</h3>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-600">
              {entry.name}: {entry.value} {entry.name === 'Latencia' ? 'ms' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-[1920px] aspect-[16/9] p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        {/* Estado de las APIs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Estado de las APIs</h2>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {data.map((api) => (
              <div key={api.name} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{api.name}</h3>
                  <StatusIndicator status={api.status} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Latencia: <span className="font-medium">{api.latencia}ms</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Solicitudes: <span className="font-medium">{api.solicitudes}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Errores: <span className="font-medium text-red-500">{api.errores}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gráficas de APIs */}
          <div className="space-y-8">
          </div>
        </div>

        {/* Resto de las estadísticas */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Estadísticas Generales</h2>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="dia">Hoy</option>
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mes</option>
            <option value="año">Este Año</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta de Proveedores */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Proveedores</h3>
              <FaUsers className="text-indigo-600 text-xl" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Total: <span className="font-semibold">{datosEstadisticas.proveedores.total}</span></p>
              <p className="text-gray-600">Activos: <span className="font-semibold text-green-600">{datosEstadisticas.proveedores.activos}</span></p>
              <p className="text-gray-600">Nuevos: <span className="font-semibold text-blue-600">{datosEstadisticas.proveedores.nuevos}</span></p>
            </div>
          </div>

          {/* Tarjeta de Pagos */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pagos</h3>
              <FaMoneyBillWave className="text-green-600 text-xl" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Total: <span className="font-semibold">Bs. {datosEstadisticas.pagos.total.toLocaleString()}</span></p>
              <p className="text-gray-600">Promedio: <span className="font-semibold">Bs. {datosEstadisticas.pagos.promedio.toLocaleString()}</span></p>
              <p className="text-gray-600">Pendientes: <span className="font-semibold text-red-600">{datosEstadisticas.pagos.pendientes}</span></p>
            </div>
          </div>

          {/* Tarjeta de Etiquetas */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Etiquetas</h3>
              <FaTags className="text-purple-600 text-xl" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Total: <span className="font-semibold">{datosEstadisticas.etiquetas.total}</span></p>
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-600">Más usadas:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {datosEstadisticas.etiquetas.masUsadas.map((etiqueta, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {etiqueta}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfica de Ventas del Mes */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ventas del Mes</h3>
              <FaChartPie className="text-indigo-600 text-xl" />
            </div>
            <div className="h-64 flex items-center justify-center">
              <Pie data={datosVentas} options={opcionesPie} />
            </div>
          </div>

          {/* Gráfica de Crecimiento de Proveedores */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Crecimiento de Proveedores</h3>
              <FaChartLine className="text-green-600 text-xl" />
            </div>
            <div className="h-64">
              <Line data={datosProveedores} options={opcionesLine} />
            </div>
          </div>
        </div>

        {/* Gráfica de Ventas Diarias */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ventas Diarias</h3>
            <FaChartBar className="text-blue-600 text-xl" />
          </div>
          <div className="h-64">
            <Bar data={datosVentasDiarias} options={opcionesBar} />
          </div>
        </div>
      </div>
    </div>
  );
}; 
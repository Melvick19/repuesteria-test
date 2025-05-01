import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  UserGroupIcon,
  TagIcon,
  UserIcon,
  ChevronLeftIcon,
  SunIcon,
  MoonIcon,
  ChartBarIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const navigation = [
  {
    name: 'Estadísticas',
    href: '/dashboard/estadisticas',
    icon: ChartBarIcon
  },
  {
    name: 'Proveedores',
    href: '/dashboard/proveedores',
    icon: UserGroupIcon
  },
  {
    name: 'Etiquetas de Proveedores',
    href: '/dashboard/crear-etiquetas',
    icon: TagIcon
  },
  {
    name: 'Asesor Humano',
    href: '/dashboard/asesor',
    icon: UserIcon
  },
  {
    name: 'Administradores',
    href: '/dashboard/administradores',
    icon: UserCircleIcon
  },
  {
    name: 'Historial de Pagos',
    href: '/dashboard/historial-pagos',
    icon: CurrencyDollarIcon
  }
];

export const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showConfig, setShowConfig] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulamos un proceso de cierre de sesión
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoggingOut(false);
    navigate('/login');
  };

  const configOptions = [
    { name: 'Perfil', onClick: () => console.log('Perfil') },
    { name: 'Notificaciones', onClick: () => console.log('Notificaciones') },
    { name: 'Seguridad', onClick: () => console.log('Seguridad') },
    { name: 'Idioma', onClick: () => console.log('Idioma') },
    { name: 'Cerrar Sesión', onClick: () => setShowLogoutModal(true), className: 'text-red-600 hover:bg-red-50' }
  ];

  return (
    <div className={`flex h-screen w-full ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Sidebar fijo más grande */}
      <div 
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } fixed left-0 top-0 h-screen flex-shrink-0 transition-all duration-300 ease-in-out ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        } border-r z-30`}
      >
        <div className="flex h-full flex-col">
          {/* Header del sidebar más alto */}
          <div className={`h-16 flex items-center justify-between px-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`${!isOpen && 'hidden'} text-base font-semibold truncate ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Panel Admin
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeftIcon 
                className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                } transition-transform duration-300 ${
                  !isOpen && 'rotate-180'
                }`}
              />
            </button>
          </div>

          {/* Links de navegación más grandes */}
          <nav className="flex-1 space-y-1 px-3 py-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      isActive 
                        ? isDarkMode ? 'text-blue-200' : 'text-blue-600'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  />
                  <span className={`${!isOpen ? 'hidden' : 'ml-3'} truncate`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Botón de tema y configuración */}
          <div className={`p-3 space-y-2 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
              <span className={`${!isOpen ? 'hidden' : 'ml-2'} text-sm truncate`}>
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </span>
            </button>

            {/* Botón de configuración */}
            <div className="relative">
              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <Cog6ToothIcon className="h-5 w-5" />
                  <span className={`${!isOpen ? 'hidden' : 'ml-2'} text-sm truncate`}>
                    Configuración
                  </span>
                </div>
                <ChevronUpIcon className={`h-4 w-4 transition-transform ${showConfig ? '' : 'rotate-180'}`} />
              </button>

              {/* Menú desplegable de configuración */}
              {showConfig && isOpen && (
                <div className={`absolute bottom-full left-0 w-full mb-1 rounded-lg shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  {configOptions.map((option, index) => (
                    <button
                      key={option.name}
                      onClick={option.onClick}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        index === 0 ? 'rounded-t-lg' : ''
                      } ${
                        index === configOptions.length - 1 ? 'rounded-b-lg' : ''
                      } ${
                        option.className || `${
                          isDarkMode 
                            ? 'hover:bg-gray-700 text-gray-300' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`
                      } transition-colors`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 max-w-sm w-full mx-4 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}>
            <h3 className="text-lg font-medium mb-4">¿Estás seguro que deseas cerrar sesión?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cerrando sesión...
                  </>
                ) : (
                  'Cerrar sesión'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal con margen izquierdo dinámico */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Barra superior fija más alta */}
        <header className={`fixed top-0 right-0 h-16 ${
          isOpen ? 'left-64' : 'left-16'
        } transition-all duration-300 border-b ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        } z-20`}>
          <div className="flex h-full items-center px-6">
            <h1 className={`text-lg font-semibold truncate ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>

        {/* Área de contenido principal con scroll */}
        <main className={`pt-16 min-h-screen ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          <div className={`h-[calc(100vh-4rem)] ${location.pathname === '/dashboard/asesor' ? 'pl-6 pt-6 pb-6' : 'p-6'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}; 
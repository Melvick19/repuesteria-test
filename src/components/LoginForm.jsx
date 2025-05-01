import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaCog, FaWrench, FaCar } from 'react-icons/fa';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    // Simulamos un proceso de inicio de sesión
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="w-screen h-screen min-h-0 min-w-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden">
      {/* Fondo con elementos temáticos */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <FaRobot className="text-blue-300 text-7xl" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <FaCog className="text-gray-300 text-6xl" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float">
          <FaWrench className="text-yellow-200 text-5xl" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float-delayed">
          <FaCar className="text-blue-200 text-6xl" />
        </div>
      </div>

      {/* Formulario centrado */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-2xl border border-blue-100 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Panel de Administración</h2>
          <p className="mt-2 text-blue-700">Inteligencia Artificial para Repuestos</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-white border border-blue-200 text-blue-900 placeholder-blue-300 focus:border-blue-400 focus:ring-blue-400"
              placeholder="ejemplo@empresa.com"
              required
              disabled={isLoggingIn}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-white border border-blue-200 text-blue-900 placeholder-blue-300 focus:border-blue-400 focus:ring-blue-400"
              placeholder="••••••••"
              required
              disabled={isLoggingIn}
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}; 
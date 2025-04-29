import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaCog, FaWrench, FaCar } from 'react-icons/fa';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
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
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}; 
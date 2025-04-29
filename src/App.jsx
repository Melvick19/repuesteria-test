import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Estadisticas } from './components/Estadisticas';
import CrearProveedor from './components/CrearProveedor';
import { CrearEtiquetas } from './components/CrearEtiquetas';
import { AsesorHumano } from './components/AsesorHumano';
import Administradores from './components/Administradores';
import HistorialPagos from './components/HistorialPagos';
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Navigate to="/dashboard/estadisticas" replace />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/estadisticas"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Estadisticas />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/proveedores"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CrearProveedor />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/crear-etiquetas"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CrearEtiquetas />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/asesor"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <AsesorHumano />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/administradores"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Administradores />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/historial-pagos"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <HistorialPagos />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

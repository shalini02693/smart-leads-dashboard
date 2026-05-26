import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LeadDetails from './pages/LeadDetails';

import ProtectedRoute from './routes/ProtectedRoute';

import { useThemeStore } from './store/themeStore';

const App = () => {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={
        darkMode
          ? 'min-h-screen bg-black text-white'
          : 'min-h-screen bg-gray-100 text-black'
      }
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lead/:id"
            element={
              <ProtectedRoute>
                <LeadDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
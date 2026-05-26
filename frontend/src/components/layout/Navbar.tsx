import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';

import { useThemeStore } from '../../store/themeStore';

const Navbar = () => {
  const navigate = useNavigate();

  const { logout, role } = useAuthStore();

  const { toggleTheme, darkMode } =
    useThemeStore();

  const handleLogout = () => {
    logout();

    navigate('/login');
  };

  return (
    <nav
      className={
        darkMode
          ? 'bg-gray-900 text-white px-6 py-4 flex justify-between'
          : 'bg-blue-600 text-white px-6 py-4 flex justify-between'
      }
    >
      <Link to="/dashboard">
        Smart Leads
      </Link>

      <div className="flex gap-4">
        <button
          onClick={toggleTheme}
          className="bg-black px-4 py-2 rounded"
        >
          Toggle Theme
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

        <span>{role}</span>
      </div>
    </nav>
  );
};

export default Navbar;
import { useState } from 'react';
import Button from '../components/Button';
import { PokeballIcon } from '../icons';
import Menu from './Menu';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownVisible(false);
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center py-2.5 px-3.5 bg-gray-800 text-white">
      <div className="flex items-center space-x-2">
        <PokeballIcon />
        <span className="text-xl font-sans font-semibold">Pok.GO</span>
      </div>
      <div>
        <Menu />
      </div>
      <div className="flex items-center space-x-4 relative">
        <Button>Create Event</Button>
        <span
          className="text-2xl cursor-pointer"
          onClick={() => setDropdownVisible((prev) => !prev)}
        >
          🙂
        </span>
        {dropdownVisible && (
          <div className="absolute right-0 translate-y-11 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

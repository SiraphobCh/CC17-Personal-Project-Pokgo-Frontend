import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';

const menulist = [
  { id: 1, label: 'Events', to: '/' },
  { id: 2, label: 'Discover', to: '/discover' },
];

export default function Menu() {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-center gap-2 py-1.5">
      {menulist.map((el) => (
        <MenuItem key={el.id} label={el.label} to={el.to} active={pathname === el.to} />
      ))}
    </nav>
  );
}

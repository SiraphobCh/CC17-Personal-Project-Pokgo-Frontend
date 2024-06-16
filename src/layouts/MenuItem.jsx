import { Link } from 'react-router-dom';

function MenuItem({ label, to, active }) {
  return (
    <Link to={to} className={`px-2.5 ${active ? '' : 'text-gray-400 hover:text-white'}`}>
      {label}
    </Link>
  );
}

export default MenuItem;

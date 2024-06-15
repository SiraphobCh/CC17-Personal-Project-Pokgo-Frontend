import Button from '../components/Button';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <nav>
        <ul className="flex space-x-4">
          <li>Events</li>
          <li>Discover</li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Button>Create Event</Button>
        <span className="text-2xl">🙂</span>
      </div>
    </header>
  );
}

import { ModeToggle } from './mode-toggle'; // Adjust the import path as necessary
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="dark:text-white text-2xl font-bold text-black">Chat App</h1>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { ModeToggle } from './mode-toggle'; // Adjust the import path as necessary
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4 items-center">
            <h1 className="dark:text-white text-2xl font-bold text-black">CHAT APP</h1>
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

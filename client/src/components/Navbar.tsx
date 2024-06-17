
import { ModeToggle } from './mode-toggle'; // Adjust the import path as necessary
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className=" p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Centered h1 */}
        <div className="flex-1 text-center">
          <h1 className="dark:text-white text-2xl font-bold text-black">Chat App</h1>
        </div>
        {/* Top right corner buttons */}
        <div className="flex space-x-4 items-center">
          <ModeToggle />
          <LogoutButton/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

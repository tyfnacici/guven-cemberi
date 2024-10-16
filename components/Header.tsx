import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm lg:hidden">
      <div className="p-4 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 focus:outline-none focus:text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;

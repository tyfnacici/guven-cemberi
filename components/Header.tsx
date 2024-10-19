import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  currentMenuItem: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, currentMenuItem }) => {
  return (
    <header className="bg-white shadow-sm lg:hidden">
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl font-bold">{currentMenuItem}</h1>
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

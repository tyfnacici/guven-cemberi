"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMenuItem: string;
  menuItems: { name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentMenuItem,
  menuItems,
}) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      !(
        item.name === "Şifre Oluşturucu" &&
        item.path !== "/sifre-olusturucu/ipuclari"
      )
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 z-30 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-auto`}
      >
        <div className="p-4 h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold w-64">{currentMenuItem}</h2>
            <button
              className="text-xl font-semibold lg:hidden"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul>
              {filteredMenuItems.map((item) => (
                <li key={item.path} className="mb-2">
                  <Link href={item.path}>
                    <span
                      className={`block p-2 rounded ${
                        pathname === item.path
                          ? "bg-gray-200 text-gray-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

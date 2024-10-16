"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Prop for closing the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null); // Reference for the sidebar

  const menuItems = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Şifre Oluşturucu", path: "/sifre-olusturucu" },
    { name: "Bilgilendirme Köşesi", path: "/bilgilendirme" },
    { name: "Bilgi Toplama", path: "/bilgi-toplama" },
    { name: "Website Güvenlik Taraması", path: "/website-guvenlik" },
    { name: "Dosya Virüs Taraması", path: "/virus-tarama" },
    { name: "Sızıntı taraması", path: "/sizinti-tarama" },
  ];

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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:w-auto`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
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

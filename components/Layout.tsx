"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Şifre Oluşturucu", path: "/sifre-olusturucu/ipuclari" },
  { name: "Şifre Oluşturucu", path: "/sifre-olusturucu/olustur" },
  { name: "Şifre Oluşturucu", path: "/sifre-olusturucu/kontrol" },
  { name: "Bilgilendirme Köşesi", path: "/bilgilendirme" },
  { name: "Bilgi Toplama", path: "/bilgi-toplama" },
  { name: "Website Güvenlik Taraması", path: "/website-guvenlik" },
  { name: "Dosya Virüs Taraması", path: "/virus-tarama" },
  { name: "Sızıntı taraması", path: "/sizinti-tarama" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentMenuItem =
    menuItems.find((item) => item.path === pathname)?.name || "Menu";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          currentMenuItem={currentMenuItem}
        />
        <main className="flex-1 flex items-center justify-center overflow-x-hidden bg-gray-100">
          <div className="container mx-auto px-6 py-8 flex items-center justify-center h-screen w-screen">
            {children}
          </div>
        </main>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentMenuItem={currentMenuItem}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Layout;

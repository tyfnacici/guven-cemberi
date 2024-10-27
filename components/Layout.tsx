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

  const getCurrentMenuName = () => {
    if (pathname.includes("sifre-olusturucu")) {
      const subPath = pathname.split("/").pop();
      switch (subPath) {
        case "ipuclari":
          return "Şifre İpuçları";
        case "olustur":
          return "Şifre Oluştur";
        case "kontrol":
          return "Şifre Kontrol";
        default:
          return "Şifre Oluşturucu";
      }
    }
    return menuItems.find((item) => item.path === pathname)?.name || "Menu";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          currentMenuItem={getCurrentMenuName()}
        />
        <main className="flex-1 flex items-center justify-center overflow-x-hidden bg-gray-100">
          <div className="container mx-auto px-6 py-8 flex items-center justify-center h-full w-full">
            <div
              className="relative bg-white rounded-lg flex justify-center pb-4 border-gray-400 shadow-md w-full mx-auto space-y-8 
                      h-full
                      overflow-y-auto hide-scrollbar border-2 my-10"
            >
              {children}
            </div>
          </div>
        </main>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Layout;

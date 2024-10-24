"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = { buttonText: string };

const Button = (props: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const lastSegment = pathName?.split("/").pop();
  const pathMap: { [key: string]: string } = {
    kontrol: "Kontrol",
    ipuclari: "İpuçları",
    olustur: "Oluştur",
  };

  const isSelected = pathMap[lastSegment || ""] === props.buttonText;

  const handleNavigation = () => {
    const targetPath = Object.keys(pathMap).find(
      (key) => pathMap[key] === props.buttonText
    );
    if (targetPath) {
      router.push(`/sifre-olusturucu/${targetPath}`);
    }
  };

  return (
    <button
      onClick={handleNavigation}
      className={`
        w-full h-fit 
        border-2 rounded-xl px-4 py-2 
        text-md md:w-auto lg:px-6 lg:text-xl
        transition-all duration-300 ease-in-out
        shadow-sm hover:shadow-md
        ${
          isSelected
            ? "bg-blue-500 border-blue-600 text-white hover:bg-blue-600"
            : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500"
        }
      `}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;

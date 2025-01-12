"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  buttonText: string;
  onClick?: () => void;
};

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
    if (props.onClick) {
      props.onClick();
      return;
    }

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
            ? "bg-gray-500 border-gray-600 text-white hover:bg-gray-600"
            : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-500"
        }
      `}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
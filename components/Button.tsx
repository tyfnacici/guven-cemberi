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
      className={`w-full border-2 border-black rounded-xl px-3 py-2 text-xl md:w-auto lg:px-6 lg:text-2xl ${
        isSelected ? "bg-black text-white" : "hover:bg-black hover:text-white"
      }`}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;

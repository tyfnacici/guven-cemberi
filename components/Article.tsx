"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Article = () => {
  const pathname = usePathname();
  const isBilgilendirme = pathname === "/bilgilendirme";

  return (
    <div
      className={`
      w-full bg-white rounded-2xl shadow-xl overflow-hidden 
      transition-all duration-300 hover:shadow-2xl
      flex flex-col sm:flex-row
      ${
        isBilgilendirme
          ? "h-auto sm:h-56"
          : "h-auto sm:h-56 lg:h-auto lg:flex-col lg:w-80"
      }
    `}
    >
      <div
        className={`
        relative h-36 sm:h-full
        ${isBilgilendirme ? "sm:w-1/2" : "w-full sm:w-1/2 lg:w-full lg:h-44"}
      `}
      >
        <img
          src="https://avatars.githubusercontent.com/u/71210033?v=4"
          alt="Article"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-start sm:justify-center">
        <h2
          className={`
          text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2
          text-center sm:text-left
          ${isBilgilendirme ? "" : "lg:text-center"}
        `}
        >
          Karaelmas Halkevi Dergisi
        </h2>
        <p
          className={`
          text-xs sm:text-sm text-gray-600
          text-center sm:text-left line-clamp-2 sm:line-clamp-none
          ${isBilgilendirme ? "" : "lg:text-center"}
        `}
        >
          Kömüre giden yolun hikayesi Lorem ipsum dolor sit amet consectetur
          adipisicing elit ...
        </p>
        <button className="mt-2 sm:mt-4 bg-gray-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-auto text-sm sm:text-base">
          Oku
        </button>
      </div>
    </div>
  );
};

export default Article;

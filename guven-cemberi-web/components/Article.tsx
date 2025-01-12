"use client";
import React from "react";
import { usePathname } from "next/navigation";

interface Article {
  title: string;
  excerpt: string;
  imageUrl: string;
  mediumUrl: string;
}

interface ArticleProps {
  article: Article;
}

const Article = ({ article }: ArticleProps) => {
  const pathname = usePathname();
  const isBilgilendirme = pathname === "/bilgilendirme";

  const handleReadClick = () => {
    window.open(article.mediumUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col sm:flex-row ${
        isBilgilendirme
          ? "h-auto sm:h-56"
          : "h-auto sm:h-56 lg:h-[25rem] lg:flex-col lg:w-96"
      }`}
    >
      <div
        className={`relative h-36 sm:h-full ${
          isBilgilendirme ? "sm:w-1/2" : "w-full sm:w-1/2 lg:w-full lg:h-44"
        }`}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-start sm:justify-center">
        <h2
          className={`text-base sm:text-md font-semibold text-gray-800 mb-1 sm:mb-2 text-center sm:text-left ${
            isBilgilendirme ? "" : "lg:text-center"
          }`}
        >
          {!isBilgilendirme
            ? article.title.length > 25
              ? article.title.slice(0, 25) + "..."
              : article.title.slice(0, 25)
            : article.title}
        </h2>
        <p
          className={`text-xs sm:text-sm text-gray-600 text-center sm:text-left line-clamp-2 sm:line-clamp-none ${
            isBilgilendirme ? "" : "lg:text-center"
          }`}
        >
          {!isBilgilendirme
            ? article.excerpt.length > 25
              ? article.excerpt.slice(0, 25) + "..."
              : article.excerpt.slice(0, 25)
            : article.excerpt.slice(0, 80) + "..."}
        </p>
        <button
          onClick={handleReadClick}
          className="mt-2 sm:mt-4 bg-gray-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-auto text-sm sm:text-base"
        >
          {article.mediumUrl ? "Medium'da Oku" : "Oku"}
        </button>
      </div>
    </div>
  );
};

export default Article;
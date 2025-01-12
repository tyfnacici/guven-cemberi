"use client";

import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";

interface ApiResponse {
  count: number;
  lines: string[];
}

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim() || searchQuery.trim().length < 4) {
      setError("Lütfen en az dört harfli bir arama terimi giriniz");
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAK_SCANNER_URL}?query=${encodeURIComponent(
          searchQuery
        )}&start=0&limit=15`
      );

      if (!response.ok) {
        throw new Error("API isteği başarısız oldu");
      }

      const data: ApiResponse = await response.json();
      setResults(data.lines);

      if (data.lines.length === 0) {
        setError("Sonuç bulunamadı");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      setResults([]);
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-start gap-y-4">
      <form
        onSubmit={handleSearch}
        className="flex flex-col w-full h-full pt-8 md:h-56 lg:pt-0 md:flex-row border-gray-400 border-b-2 gap-x-6 items-center justify-start rounded-lg space-y-12 shadow-md px-4 pb-4"
      >
        <div className="flex flex-col w-full h-fit pb-5 space-y-2">
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Kullanıcı adı, şifre veya email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-500 text-xl px-2 py-1 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out disabled:bg-gray-300"
          >
            {isLoading ? "Aranıyor..." : "Tarat"}
          </button>
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      <div className="flex w-full h-max mb-12 flex-col gap-y-4 rounded-xl border-gray-400 border-b-2 items-center justify-start shadow-md px-6 pb-6">
        <p className="pt-8 font-bold text-lg self-start pl-2">Sonuçlar</p>
        {results.length === 0 ? (
          <p className="text-center text-gray-500">
            {isLoading ? "Aranıyor..." : "Henüz sonuç yok"}
          </p>
        ) : (
          <div className="w-full space-y-4">
            <div className="text-gray-600 font-medium">
              {results.length} sonuç bulundu
            </div>
            {results.map((line, index) => (
              <div
                key={index}
                className="w-full rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-600">
                      Sızıntı Sonucu
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-medium text-gray-800">{line}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
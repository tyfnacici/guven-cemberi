"use client";
import type { NextPage } from "next";
import Button from "@/components/Button";
import Result from "@/components/Result";
import { useState } from "react";

interface ApiResponse {
  count: number;
  lines: string[];
}

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
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
    <div className="w-full mx-auto space-y-8 overflow-y-auto hide-scrollbar">
      <div className="h-1/2 border-b-2 border-gray-400 flex flex-col md:flex-row md:h-auto">
        <div className="w-full flex flex-col gap-y-6 px-12 py-8 items-center justify-center">
          <input
            type="text"
            className={`w-full border-2 border-gray-400 rounded-xl px-3 py-2 text-xl md:w-1/2 text-center lg:px-6 lg:text-2xl
              ${isLoading ? "opacity-50" : ""}`}
            placeholder="Kullanıcı adı, şifre veya email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            buttonText={isLoading ? "Aranıyor..." : "Arat"}
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="px-12 space-y-4 pb-6">
        {error && (
          <div className="text-red-500 text-center p-4 border-2 border-red-200 rounded-xl bg-red-50">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="text-gray-600 font-medium">
              {results.length} sonuç bulundu
            </div>
            {results.map((line, index) => (
              <Result key={`${line}-${index}`} result={line} />
            ))}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-600">Aranıyor...</div>
        )}
      </div>
    </div>
  );
};

export default Home;

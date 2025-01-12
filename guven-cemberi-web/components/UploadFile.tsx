"use client";
import React, { useState } from "react";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Lütfen bir dosya seçin.");
      return;
    }

    setLoading(true);
    setError(null);
    setScanResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Dosya taraması sırasında bir hata oluştu."
        );
      }

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      console.error("Error scanning file:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Dosya taraması sırasında bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex flex-col gap-y-8 bg-gray-100 h-2/3 w-80 rounded-xl items-center justify-center shadow-2xl mt-28 p-6">
        <p className="text-3xl">Dosya Yükle</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-500 text-xl px-6 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Dosya Seç
        </label>
        <button
          onClick={handleFileUpload}
          disabled={loading || !file}
          className="bg-blue-500 text-xl px-6 py-2 rounded-lg text-white hover:bg-blue-800 transition-all duration-300 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Taranıyor..." : "Tara"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 rounded-lg text-red-600">
            <p>{error}</p>
          </div>
        )}

        {scanResult && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full">
            <h3 className="text-xl font-bold">Tarama Sonuçları:</h3>
            <p>
              Durum:{" "}
              <span
                className={
                  scanResult.data.attributes.stats.malicious > 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {scanResult.data.attributes.stats.malicious > 0
                  ? "Tehlikeli"
                  : "Temiz"}
              </span>
            </p>
            <p>
              Tespitler: {scanResult.data.attributes.stats.malicious}/
              {Object.keys(scanResult.data.attributes.results).length}
            </p>

            {scanResult.data.attributes.stats.malicious > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Detaylar:</h4>
                <ul className="space-y-2">
                  {Object.entries(scanResult.data.attributes.results).map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ([engine, result]: [string, any]) =>
                      result.category === "malicious" && (
                        <li key={engine} className="bg-red-50 p-2 rounded-lg">
                          <p className="text-red-800">
                            <strong>{engine}</strong>: {result.result}
                          </p>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;

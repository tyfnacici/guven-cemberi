"use client";
import type { NextPage } from "next";
import { useState } from "react";

interface ApiResponse {
  security_headers: {
    found_headers: { [key: string]: string };
    missing_headers: string[];
    status: string;
  };
  ssl_certificate: {
    days_remaining: number;
    expires_on: string;
    status: string;
  };
  url: string;
  validation: {
    is_valid: boolean;
    message: string;
  };
}

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    setLoading(true);
    setError(null);
    fetch("http://localhost:1453/check?url=" + encodeURIComponent(url))
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  };

  const resultItems = results
    ? [
        {
          label: "Found Headers",
          value: Object?.keys(results?.security_headers.found_headers).join(
            ", "
          ),
        },
        {
          label: "Missing Headers",
          value: results.security_headers.missing_headers.join(", "),
        },
        {
          label: "Security Headers Status",
          value: results.security_headers.status,
        },
        {
          label: "SSL Certificate Valid Until",
          value: results.ssl_certificate.expires_on,
        },
        {
          label: "Days Remaining",
          value: results.ssl_certificate.days_remaining,
        },
        {
          label: "SSL Certificate Status",
          value: results.ssl_certificate.status,
        },
        {
          label: "URL Validation",
          value: results.validation.is_valid ? "Valid" : "Invalid",
        },
        { label: "Validation Message", value: results.validation.message },
      ]
    : [];

  return (
    <div className="h-full w-full flex flex-col justify-start gap-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-y-4 py-5 h-40 border-gray-400 border-b-2 rounded-xl items-center justify-center shadow-md"
      >
        <input
          type="text"
          className="text-2xl border-2 px-6 py-3 rounded-xl"
          placeholder="URL giriniz."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-500 text-xl px-6 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out"
        >
          Tarat
        </button>
      </form>
      <div className="flex w-full h-max mb-4 flex-col gap-y-4 rounded-xl border-gray-400 border-b-2 items-center justify-start shadow-md px-6 pb-6">
        <p className="pt-8 font-bold text-lg self-start pl-2">Sonuçlar</p>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {resultItems.map((item, index) => (
          <p key={index}>{`${item.label}: ${item.value}`}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;

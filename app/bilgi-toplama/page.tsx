"use client";

import type { NextPage } from "next";
import Result from "@/guven-cemberi-web/components/Result";
import { useState, FormEvent } from "react";

interface SearchResult {
  platform?: string;
  url?: string;
  additional_info?: Record<string, string>;
}

interface BlackbirdResponse {
  error?: string;
  search_term: string;
  search_type: string;
  data: {
    results: SearchResult[];
    execution_info: {
      execution_time: number;
      sites_checked: number;
    };
    total_found: number;
  };
}

interface PhoneResponse {
  error?: string;
  target_phone: string;
  country: string;
  area_state: string;
  carrier: string;
  instagram_registered: boolean;
  country_details: {
    top_level_domain: string;
    continent: string;
    capital: string;
    time_zone: string;
    currency: string;
    languages: string[];
    latitude: number;
    longitude: number;
  };
  tellows_details: {
    url: string;
    score: number;
    call_type: string;
  };
  spamcalls_details: {
    url: string;
    explanation: string;
    spam_risk: string;
    last_activity: string;
    latest_report: string;
  };
}

interface LoadingState {
  email: boolean;
  username: boolean;
  phone: boolean;
}

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState<
    Record<string, { result: string; type: "email" | "username" | "phone" }[]>
  >({});
  const [loading, setLoading] = useState<LoadingState>({
    email: false,
    username: false,
    phone: false,
  });
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{10,14}$/;
    return phoneRegex.test(phone);
  };

  const formatPhone = (phone: string): string => {
    return phone.replace(/\s+/g, "").replace(/^(?!\+)/, "+");
  };

  const handlePhoneChange = (value: string) => {
    const formattedPhone = formatPhone(value);
    setPhone(formattedPhone);
  };

  const addResults = (
    newResults: {
      result: string;
      searchInput: string;
      type: "email" | "username" | "phone";
    }[]
  ) => {
    setResults((prevResults) => {
      const updatedResults = { ...prevResults };

      newResults.forEach(({ result, searchInput, type }) => {
        if (!updatedResults[searchInput]) {
          updatedResults[searchInput] = [];
        }
        updatedResults[searchInput].push({ result, type });
      });

      return updatedResults;
    });
  };

  const searchEmails = async (emails: string[]) => {
    setLoading((prev) => ({ ...prev, email: true }));
    try {
      const searches = emails.map((email) =>
        fetch("http://localhost:1453/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: email.trim(), type: "email" }),
        }).then((res) => res.json())
      );

      const responses = await Promise.all(searches);
      const emailResults = responses.flatMap((data: BlackbirdResponse, index) =>
        data.error
          ? []
          : data.data.results.map((result) => ({
              result: `${result.platform}: ${result.url}${
                Object.keys(result.additional_info || {}).length
                  ? ` (${Object.entries(result.additional_info || {})
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(", ")})`
                  : ""
              }`,
              searchInput: emails[index],
              type: "email" as const,
            }))
      );
      addResults(emailResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const searchPhones = async (phones: string[]) => {
    setLoading((prev) => ({ ...prev, phone: true }));
    try {
      const searches = phones.map((phone) =>
        fetch("http://localhost:1453/phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number: phone.trim() }),
        }).then((res) => res.json())
      );

      const responses = await Promise.all(searches);
      const phoneResults = responses.flatMap((data: PhoneResponse, index) =>
        data.error
          ? []
          : [
              `Telefon: ${data.target_phone}`,
              `Ülke: ${data.country}`,
              `Bölge: ${data.area_state}`,
              `Operatör: ${data.carrier}`,
              `Instagram Kayıtlı: ${
                data.instagram_registered ? "Evet" : "Hayır"
              }`,
              `Spam Riski: ${data.spamcalls_details.spam_risk || "Bilinmiyor"}`,
              `Son Aktivite: ${
                data.spamcalls_details.last_activity || "Bilinmiyor"
              }`,
            ]
              .filter(
                (result) =>
                  result.includes(": ") && !result.includes(": undefined")
              )
              .map((result) => ({
                result,
                searchInput: phones[index],
                type: "phone" as const,
              }))
      );
      addResults(phoneResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading((prev) => ({ ...prev, phone: false }));
    }
  };

  const searchUsernames = async (usernames: string[]) => {
    setLoading((prev) => ({ ...prev, username: true }));
    try {
      const searches = usernames.map((username) =>
        fetch("http://localhost:1453/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: username.trim(), type: "username" }),
        }).then((res) => res.json())
      );

      const responses = await Promise.all(searches);
      const usernameResults = responses.flatMap(
        (data: BlackbirdResponse, index) =>
          data.error
            ? []
            : data.data.results.map((result) => ({
                result: `${result.platform}: ${result.url}${
                  Object.keys(result.additional_info || {}).length
                    ? ` (${Object.entries(result.additional_info || {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")})`
                    : ""
                }`,
                searchInput: usernames[index],
                type: "username" as const,
              }))
      );
      addResults(usernameResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading((prev) => ({ ...prev, username: false }));
    }
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults({});

    const emails = email
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const usernames = username
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
    const phones = phone
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    // Validate emails
    const invalidEmails = emails.filter((e) => !validateEmail(e));
    if (invalidEmails.length > 0) {
      setError(`Geçersiz email formatı: ${invalidEmails.join(", ")}`);
      return;
    }

    // Validate phones
    const invalidPhones = phones.filter((p) => !validatePhone(formatPhone(p)));
    if (invalidPhones.length > 0) {
      setError(
        `Geçersiz telefon formatı: ${invalidPhones.join(
          ", "
        )}. Örnek: +905555555555`
      );
      return;
    }

    if (emails.length > 0) {
      await searchEmails(emails);
    }

    if (usernames.length > 0) {
      await searchUsernames(usernames);
    }

    if (phones.length > 0) {
      await searchPhones(phones.map(formatPhone));
    }
  };

  const isLoading = Object.values(loading).some(Boolean);

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
            placeholder="Email(ler) (virgülle ayırın)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Kullanıcı adı/adları (virgülle ayırın)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="tel"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Tel No(lar) (+905555555555, virgülle ayırın)"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-500 text-xl px-2 py-1 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out disabled:bg-gray-300"
          >
            {isLoading ? "Aranıyor..." : "Tarat"}
          </button>
          <p className="text-center text-sm">
            Not: Tüm alanları doldurabilirsiniz.
          </p>
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      <div className="flex w-full h-max mb-12 flex-col gap-y-4 rounded-xl border-gray-400 border-b-2 items-center justify-start shadow-md px-6 pb-6">
        <p className="pt-8 font-bold text-lg self-start pl-2">Sonuçlar</p>
        {Object.keys(results).length === 0 ? (
          <p className="text-center text-gray-500">Henüz sonuç yok</p>
        ) : (
          Object.entries(results).map(([searchInput, resultGroup], index) => (
            <Result
              key={index}
              results={resultGroup}
              searchInput={searchInput}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

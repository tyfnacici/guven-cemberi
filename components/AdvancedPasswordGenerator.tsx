"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  special: boolean;
  excludeSimilar: boolean;
  avoidCommonWords: boolean;
  pronounceable: boolean;
  customExclusions: string;
}

const AdvancedPasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
    excludeSimilar: false,
    avoidCommonWords: true,
    pronounceable: false,
    customExclusions: "",
  });

  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [entropy, setEntropy] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const similarChars = "O0Il1";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

  const calculateEntropy = useCallback((password: string): number => {
    const charSet = new Set(password).size;
    return Math.round(password.length * Math.log2(charSet));
  }, []);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (options.uppercase) chars += uppercaseChars;
    if (options.lowercase) chars += lowercaseChars;
    if (options.numbers) chars += numberChars;
    if (options.special) chars += specialChars;

    if (options.excludeSimilar) {
      similarChars.split("").forEach((char) => {
        chars = chars.replace(char, "");
      });
    }

    if (options.customExclusions) {
      options.customExclusions.split("").forEach((char) => {
        chars = chars.replace(char, "");
      });
    }

    if (chars.length === 0) return "";

    let password = "";
    const array = new Uint32Array(options.length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < options.length; i++) {
      password += chars[array[i] % chars.length];
    }

    if (options.pronounceable) {
      // Simple pronounceable algorithm - alternate consonants and vowels
      const vowels = "aeiou";
      const consonants = "bcdfghjklmnpqrstvwxyz";
      let pronounceablePassword = "";
      for (let i = 0; i < options.length; i++) {
        pronounceablePassword +=
          i % 2 === 0
            ? consonants[Math.floor(Math.random() * consonants.length)]
            : vowels[Math.floor(Math.random() * vowels.length)];
      }
      password = pronounceablePassword;
    }

    return password;
  }, [options]);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setGeneratedPassword(newPassword);
    setEntropy(calculateEntropy(newPassword));
    setShowPassword(true);
    // Auto-hide password after 30 seconds
    setTimeout(() => setShowPassword(false), 30000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Password Display Section */}
      <section className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4">
          <div className="flex-grow">
            <input
              type="text"
              className="w-full px-4 py-3 text-lg border rounded-lg bg-gray-50"
              value={showPassword ? generatedPassword : "••••••••"}
              readOnly
            />
          </div>
          <div className="flex sm:flex-col gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? "Kopyalandı" : "Kopyala"}
            </button>
            <button
              onClick={handleGeneratePassword}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw size={20} />
              Yenile
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Entropi: {entropy} bit</div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                entropy < 50
                  ? "bg-red-500"
                  : entropy < 80
                  ? "bg-yellow-500"
                  : entropy < 100
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, (entropy / 128) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Şifre Seçenekleri</h2>

        {/* Length Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Şifre Uzunluğu: {options.length}
          </label>
          <input
            type="range"
            min="8"
            max="128"
            value={options.length}
            onChange={(e) =>
              setOptions({ ...options, length: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) =>
                  setOptions({ ...options, uppercase: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Büyük Harfler (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) =>
                  setOptions({ ...options, lowercase: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Küçük Harfler (a-z)</span>
            </label>
          </div>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) =>
                  setOptions({ ...options, numbers: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Sayılar (0-9)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.special}
                onChange={(e) =>
                  setOptions({ ...options, special: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Özel Karakterler (!@#$%^&*)</span>
            </label>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.excludeSimilar}
                onChange={(e) =>
                  setOptions({ ...options, excludeSimilar: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Benzer Karakterleri Hariç Tut (O, 0, I, l)</span>
            </label>

            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.avoidCommonWords}
                onChange={(e) =>
                  setOptions({ ...options, avoidCommonWords: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Yaygın Kelimeleri Önle</span>
            </label>
          </div>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={options.pronounceable}
                onChange={(e) =>
                  setOptions({ ...options, pronounceable: e.target.checked })
                }
                className="w-5 h-5 rounded"
              />
              <span>Okunabilir Şifre Oluştur</span>
            </label>

            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium mb-2">
                Hariç Tutulacak Karakterler
              </label>
              <input
                type="text"
                value={options.customExclusions}
                onChange={(e) =>
                  setOptions({ ...options, customExclusions: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: {}[]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedPasswordGenerator;

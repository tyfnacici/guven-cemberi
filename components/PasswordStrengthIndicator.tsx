"use client";
import React, { useState, useEffect } from "react";

interface PasswordStrengthProps {
  className?: string;
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4 | 5;

const PasswordStrengthIndicator: React.FC<PasswordStrengthProps> = ({
  className = "",
}) => {
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<StrengthLevel>(0);

  const calculateStrength = (pass: string): StrengthLevel => {
    let score = 0;

    if (pass.length > 0) score += 1;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;

    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    return Math.min(score, 5) as StrengthLevel;
  };

  const getStrengthText = (score: StrengthLevel): string => {
    switch (score) {
      case 0:
        return "Yok";
      case 1:
        return "Çok Zayıf";
      case 2:
        return "Zayıf";
      case 3:
        return "Orta";
      case 4:
        return "Güçlü";
      case 5:
        return "Çok Güçlü";
      default:
        return "";
    }
  };

  const getStrengthColor = (score: StrengthLevel): string => {
    switch (score) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-lime-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium mb-3">
          Şifre
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi giriniz"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-base sm:text-lg">
          <span>Şifre Gücü:</span>
          <span className="font-medium">{getStrengthText(strength)}</span>
        </div>

        <div className="flex gap-1.5 h-3">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`flex-1 rounded-full transition-colors duration-300 ${
                level <= strength
                  ? getStrengthColor(level as StrengthLevel)
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="text-sm sm:text-base text-gray-600 mt-4">
          <ul className="list-disc list-inside space-y-2">
            <li
              className={`transition-colors ${
                password.length >= 8 ? "text-green-600" : ""
              }`}
            >
              En az 8 karakter
            </li>
            <li
              className={`transition-colors ${
                /[A-Z]/.test(password) ? "text-green-600" : ""
              }`}
            >
              Büyük harf içermeli
            </li>
            <li
              className={`transition-colors ${
                /[a-z]/.test(password) ? "text-green-600" : ""
              }`}
            >
              Küçük harf içermeli
            </li>
            <li
              className={`transition-colors ${
                /[0-9]/.test(password) ? "text-green-600" : ""
              }`}
            >
              Rakam içermeli
            </li>
            <li
              className={`transition-colors ${
                /[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""
              }`}
            >
              Özel karakter içermeli
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;

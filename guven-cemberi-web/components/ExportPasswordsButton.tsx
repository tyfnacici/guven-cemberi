import React from "react";
import { Download } from "lucide-react";
import CryptoJS from "crypto-js";

interface PasswordEntry {
  password: string;
  description: string;
}

interface ExportButtonProps {
  passwordList: PasswordEntry[];
  secretKey: string;
}

const decryptPassword = (
  encryptedPassword: string,
  secretKey: string
): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const ExportPasswordsButton: React.FC<ExportButtonProps> = ({
  passwordList,
  secretKey,
}) => {
  const exportToCSV = () => {
    const csvHeader = "Description,Password\n";

    const csvRows = passwordList
      .map((entry) => {
        const decryptedPassword = decryptPassword(entry.password, secretKey);
        const escapedDescription = `"${entry.description.replace(/"/g, '""')}"`;
        const escapedPassword = `"${decryptedPassword.replace(/"/g, '""')}"`;
        return `${escapedDescription},${escapedPassword}`;
      })
      .join("\n");

    const csvContent = csvHeader + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `passwords-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToCSV}
      className="flex items-center justify-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors w-full mt-6"
    >
      <Download size={20} />
      Parolaları İndir
    </button>
  );
};

export default ExportPasswordsButton;

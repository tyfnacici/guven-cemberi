import React from "react";
import { ExternalLink, Phone, Mail, User, Search } from "lucide-react";

interface ResultProps {
  results: {
    result: string;
    type: "email" | "username" | "phone";
  }[];
  searchInput: string;
  className?: string;
}

const Result: React.FC<ResultProps> = ({ results, searchInput, className }) => {
  // Function to determine the type of result group
  const getResultType = (
    results: ResultProps["results"]
  ): {
    icon: React.ReactNode;
    label: string;
    bgColor: string;
  } => {
    const types = new Set(results.map((r) => r.type));

    if (types.has("phone")) {
      return {
        icon: <Phone className="w-5 h-5" />,
        label: "Telefon Bilgisi",
        bgColor: "bg-blue-50",
      };
    }

    if (types.has("email")) {
      return {
        icon: <Mail className="w-5 h-5" />,
        label: "Email Sonucu",
        bgColor: "bg-green-50",
      };
    }

    if (types.has("username")) {
      return {
        icon: <User className="w-5 h-5" />,
        label: "Sosyal Medya",
        bgColor: "bg-purple-50",
      };
    }

    return {
      icon: <ExternalLink className="w-5 h-5" />,
      label: "Diğer Platform",
      bgColor: "bg-gray-50",
    };
  };

  const renderContent = (result: string) => {
    const parts = result.split(": ");

    if (parts.length < 2) {
      return <p className="font-medium text-gray-800">{result}</p>;
    }

    const [platform, remainder] = parts;
    const urlMatch = remainder.match(/(https?:\/\/[^\s)]+)(.+)?/);

    if (!urlMatch) {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">{platform}:</span>
          <span className="text-gray-800">{remainder}</span>
        </div>
      );
    }

    const [url] = urlMatch;

    return (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-gray-700">{platform}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 break-all"
        >
          {url}
          <ExternalLink className="w-4 h-4 inline" />
        </a>
      </div>
    );
  };

  const resultTypeInfo = getResultType(results);

  return (
    <div
      className={`
        w-full rounded-lg shadow-sm border border-gray-200 p-4
        hover:shadow-md transition-shadow duration-200
        ${resultTypeInfo.bgColor}
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2">
          {resultTypeInfo.icon}
          <span className="text-sm font-medium text-gray-600">
            {resultTypeInfo.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Search className="w-4 h-4" />
          <span className="font-medium">{searchInput}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={
              index < results.length - 1 ? "border-b border-gray-200 pb-4" : ""
            }
          >
            {renderContent(result.result)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
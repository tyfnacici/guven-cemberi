import React from "react";

interface ResultProps {
  result: string;
  className?: string;
}

const Result: React.FC<ResultProps> = ({ result, className }) => {
  return (
    <div
      className={`h-20 w-full bg-gray-200 rounded-xl items-center justify-center flex ${className}`}
    >
      <p className="font-bold text-xl">{result}</p>
    </div>
  );
};

export default Result;
import React from "react";
interface ResultProps {
  result: string;
}

const Result = ({ result }: ResultProps) => {
  return (
    <div className="h-20 w-full bg-gray-200 rounded-xl items-center justify-center flex">
      <p className="font-bold text-xl">{result}</p>
    </div>
  );
};

export default Result;

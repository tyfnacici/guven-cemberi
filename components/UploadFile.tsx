import React from "react";

type Props = {};

const UploadFile = (props: Props) => {
  return (
    <div className="flex w-full h-full justify-center">
      {/* File upload section */}
      <div className="flex flex-col gap-y-8 bg-gray-100 h-72 w-80 rounded-xl items-center justify-center shadow-2xl mt-28">
        {/* Buradaki metin yerine dosya yüklemek için icon gelecek */}
        <p className="text-3xl">Dosya Yükle</p>
        <button className="bg-gray-500 text-xl px-6 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out">
          Dosya Seç
        </button>
      </div>
    </div>
  );
};

export default UploadFile;

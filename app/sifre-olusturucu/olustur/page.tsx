import type { NextPage } from "next";
import AdvancedPasswordGenerator from "@/components/AdvancedPasswordGenerator";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col px-6 gap-y-8 overflow-y-scroll hide-scrollbar w-full h-full">
        <h1 className="text-start font-bold text-3xl text-gray-800 mt-24 mb-2">
          Oluştur
        </h1>

        <AdvancedPasswordGenerator />
      </div>
    </>
  );
};

export default Home;

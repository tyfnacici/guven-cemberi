// import Result from "@/components/Result";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start gap-y-4">
      {/* input section */}
      <div className="flex w-full flex-col gap-y-4 py-5 h-40 border-gray-400 border-b-2 rounded-xl items-center justify-center shadow-md">
        <input
          type="text"
          className="text-2xl border-2 px-6 py-3 rounded-xl"
          placeholder="Url giriniz."
        />
        <button className="bg-gray-500 text-xl px-6 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out">
          Tarat
        </button>
      </div>
      {/* Results */}
      <div className="flex w-full h-full mb-4 flex-col gap-y-4 rounded-xl border-gray-400 border-b-2 items-center justify-start shadow-md px-6 pb-6">
        <p className="pt-8 font-bold text-lg self-start pl-2">Sonuçlar</p>
        {/* <Result />
        <Result />
        <Result />
        <Result />
        <Result /> */}
      </div>
    </div>
  );
};

export default Home;

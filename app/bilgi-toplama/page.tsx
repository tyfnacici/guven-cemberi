import type { NextPage } from "next";
import Result from "@/components/Result";

const Home: NextPage = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start gap-y-4">
      {/* input section */}
      <div className="flex flex-col w-full h-1/2 pt-8 md:h-56 lg:pt-0 md:flex-row border-gray-400 border-b-2 gap-x-6 items-center justify-center rounded-lg space-y-12 shadow-md px-4 pb-4">
        <div className="flex flex-col w-1/2 h-fit pb-5 space-y-2">
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Tam Ad"
          />
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Email"
          />
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Tel No"
          />
          <button className="bg-gray-500 text-xl px-2 py-1 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out">
            Tarat
          </button>
        </div>
        <div className="flex flex-col w-1/2 h-full pb-5 space-y-2">
          <input
            type="text"
            className="text-md border px-2 py-1 rounded-xl"
            placeholder="Kullanıcı adı/adları"
          />
          <button className="bg-gray-500 text-xl px-2 py-1 rounded-lg text-white hover:bg-gray-800 transition-all duration-300 ease-in-out">
            Tarat
          </button>
        </div>
      </div>
      {/* Results */}
      <div className="flex w-full h-full mb-6 flex-col gap-y-4 rounded-xl border-gray-400 border-b-2 items-center justify-start shadow-md px-6 pb-6">
        <p className="pt-8 font-bold text-lg self-start pl-2">Sonuçlar</p>
        <Result result="Result 1" />
        <Result result="Result 2" />
        <Result result="Result 3" />
        <Result result="Result 4" />
        <Result result="Result 5" />
        <Result result="Result 6" />
        <Result result="Result 7" />
        <Result result="Result 8" />
      </div>
    </div>
  );
};

export default Home;

import Article from "@/components/Article";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div
        className="relative bg-white rounded-lg flex justify-center pb-4 border-gray-400 shadow-md w-full mx-auto space-y-8 
                      h-full max-h-screen
                      overflow-y-auto hide-scrollbar border-2"
      >
        <h1 className="text-4xl absolute top-6 left-6">Hoşgeldin, Tayfun</h1>
        <div className="flex gap-x-6 flex-col justify-end">
          <h1 className="text-3xl">Son yazılar</h1>
          <div className="flex gap-x-6 pt-5 flex-row items-end justify-center">
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

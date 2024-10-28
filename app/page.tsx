import Article from "@/components/Article";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex gap-x-6 flex-col h-fit w-full lg:h-full lg:justify-end">
      <h1 className="text-3xl text-center lg:text-start pt-5 lg:pt-0">
        Son yazılar
      </h1>
      <div className="flex gap-x-6 pt-5 flex-col lg:flex-row items-center lg:items-end lg:flex-shrink-0 justify-center gap-y-5 pb-4">
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
};

export default Home;

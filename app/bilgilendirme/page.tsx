import Article from "@/components/Article";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
    </div>
  );
};

export default Home;

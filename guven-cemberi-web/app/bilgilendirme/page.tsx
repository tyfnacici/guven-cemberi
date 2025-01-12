import articles from "../data/articles.json";
import Article from "@/guven-cemberi-web/components/Article";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6 pb-6">
        {articles.articles.map((article) => (
          <Article key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;

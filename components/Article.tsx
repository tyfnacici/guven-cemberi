import React from "react";

type Props = {};

const Article = (props: Props) => {
  return (
    <div className="w-56 h-56 rounded-3xl bg-slate-100 shadow-xl flex flex-col items-center">
      <div className="rounded-b-none w-full h-44 rounded-2xl relative overflow-hidden">
        <img
          src="https://avatars.githubusercontent.com/u/71210033?v=4"
          alt="Article"
          className="absolute inset-0 w-full h-full object-fit"
        />
      </div>
      <div className="self-center pt-2 text-center px-2">
        Lorem ipsum dolor sit amet
      </div>
    </div>
  );
};

export default Article;

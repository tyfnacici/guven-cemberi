import UploadFile from "@/components/UploadFile";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <UploadFile />
    </div>
  );
};

export default Home;

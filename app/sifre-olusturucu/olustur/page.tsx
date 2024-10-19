import type { NextPage } from "next";
import Button from "@/components/Button";

const Home: NextPage = () => {
  return (
    <>
      <div className="absolute top-24 lg:top-8 w-full flex flex-col gap-y-4 px-4 md:w-auto md:flex-row md:gap-x-4 md:justify-center">
        <Button buttonText="İpuçları" />
        <Button buttonText="Kontrol" />
        <Button buttonText="Oluştur" />
      </div>
      <div
        className="relative bg-white p-6 rounded-lg shadow-md w-full mx-auto mt-16 space-y-8 
                      h-full max-h-screen lg:max-h-[700px] lg:max-w-[900px] lg:w-[900px] 
                      overflow-y-auto hide-scrollbar"
      >
        <h1 className="text-start font-bold text-3xl">Şifre kontrol</h1>
      </div>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col w-full px-6 gap-y-8 overflow-y-scroll hide-scrollbar">
        <h1 className="text-start font-bold text-3xl text-gray-800 mt-24 mb-2">
          Şifre Kontrol
        </h1>

        <PasswordStrengthIndicator />
      </div>
    </>
  );
};

export default Home;

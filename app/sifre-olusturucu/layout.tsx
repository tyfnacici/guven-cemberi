import Button from "@/guven-cemberi-web/components/Button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute w-full justify-center pb-5 px-8 lg:top-5 gap-x-2 pt-4 lg:pt-0 flex flex-row lg:gap-x-4 lg:px-0 backdrop-blur-md bg-white/40 shadow-lg border-b border-gray-200/50 z-10">
        <Button buttonText="İpuçları" />
        <Button buttonText="Kontrol" />
        <Button buttonText="Oluştur" />
      </div>
      {children}
    </>
  );
}

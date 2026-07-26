import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[url('/background.png')] bg-center bg-cover bg-no-repeat font-sans">
      <main className="flex flex-1 w-full bg-black/10 backdrop-blur-md flex-col items-center justify-between py-32 px-16 sm:items-start">
        <SearchBar />
      </main>
    </div>
  );
}

"use client";

import AlbumCard from "@/components/AlbumCard";
import AlbumCardSkeleton from "@/components/AlbumCardSkeleton";
import Grid from "@/components/Grid";
import SearchBar from "@/components/SearchBar";
import { useAlbums } from "@/hooks/useAlbums";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError } = useAlbums(debouncedSearch);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[url('/background.png')] bg-center bg-cover bg-no-repeat font-sans">
      <main className="flex flex-1 w-full bg-black/10 backdrop-blur-md flex-col items-center justify-between py-32 px-16 sm:items-start">
        <SearchBar value={search} onChange={setSearch} />
        <Grid>
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <AlbumCardSkeleton key={index} />
              ))
            : data?.results.map((album) => (
                <AlbumCard key={album.collectionId} album={album} />
              ))}
        </Grid>
      </main>
    </div>
  );
}

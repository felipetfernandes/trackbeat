"use client";

import AlbumCard from "@/components/AlbumCard";
import AlbumCardSkeleton from "@/components/AlbumCardSkeleton";
import Grid from "@/components/Grid";
import SearchBar from "@/components/SearchBar";
import TrackCard from "@/components/TrackCard";
import { useAlbumById, useAlbums } from "@/hooks/useAlbums";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Undo2 } from "lucide-react";
import clsx from "clsx";
import Player from "@/components/Player";
import { ApiTrack } from "@/lib/api/schemas/track.schema";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<ApiTrack | null>(null);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError } = useAlbums(debouncedSearch);

  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
  } = useAlbumById(selectedAlbumId);

  const album = albumData?.results[0];
  const tracks: ApiTrack[] | undefined = albumData?.results.slice(1);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[url('/background.png')] bg-center bg-cover bg-no-repeat font-sans">
      <main className="flex flex-1 w-full bg-black/10 backdrop-blur-md flex-col items-center justify-between py-32 px-16 sm:items-start">
        <SearchBar value={search} onChange={setSearch} />

        {album && (
          <div className="flex flex-row items-center justify-between w-full max-w-4xl mb-16">
            <h1 className="text-2xl font-bold text-white mb-4">{album?.collectionName}</h1>
            <button onClick={() => (setSelectedAlbumId(null))}><Undo2 className={clsx("text-white hover:text-emerald-400")} /></button>
          </div>
        )}
        <Grid>
          {tracks ?
            tracks.length > 0 &&
            tracks.map((track) => (
              <TrackCard key={track.trackId} track={track} playTrack={setCurrentTrack} />
            ))
          : isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <AlbumCardSkeleton key={index} />
              ))
            : data?.results.map((album) => (
                <AlbumCard
                  key={album.collectionId}
                  album={album}
                  selectAlbumId={setSelectedAlbumId}
                />
              ))}
        </Grid>
        <Player track={currentTrack} />
      </main>
    </div>
  );
}

"use client";

import AlbumCard from "@/components/AlbumCard";
import AlbumCardSkeleton from "@/components/AlbumCardSkeleton";
import Grid from "@/components/Grid";
import SearchBar from "@/components/SearchBar";
import TrackCard from "@/components/TrackCard";
import { useAlbumById, useAlbums } from "@/hooks/useAlbums";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useMemo, useState } from "react";
import { Undo2 } from "lucide-react";
import clsx from "clsx";
import Player from "@/components/Player";
import { ApiTrack, StoredTrack } from "@/lib/api/schemas/track.schema";
import { getFavorites, removeFavorite, saveFavorite } from "@/lib/db/favorites";
import TrackMiniCard from "@/components/TrackMiniCard";
import { Queue } from "@/lib/db";
import {
  clearQueue,
  dequeue,
  enqueue,
  getQueue,
  saveQueue,
  shuffleQueue,
} from "@/lib/db/queue";
import { toStoredTrack } from "@/lib/api/mappers/track.mapper";
import SideBar from "@/components/SideBar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [favoriteTracks, setFavoriteTracks] = useState<StoredTrack[]>([]);
  const [queue, setQueue] = useState<Queue | null>(null);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError } = useAlbums(debouncedSearch);

  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
  } = useAlbumById(selectedAlbumId);

  const favoriteIds = useMemo(
    () => new Set(favoriteTracks.map(({ trackId }) => trackId)),
    [favoriteTracks],
  );

  const [album, tracks] = useMemo(() => {
    if (!albumData?.results) return [undefined, undefined];

    const album = albumData.results[0];
    const tracks: ApiTrack[] = albumData.results.slice(1);

    return [album, tracks];
  }, [albumData]);

  useEffect(() => {
    async function load() {
      setFavoriteTracks((await getFavorites()).map(({ track }) => track));

      setQueue(await getQueue());
    }

    load();
  }, []);

  const handleFavoriteState = async (track: StoredTrack) => {
    if (favoriteIds.has(track.trackId)) {
      await removeFavorite(track.trackId);

      setFavoriteTracks((current) =>
        current.filter(({ trackId }) => trackId !== track.trackId),
      );

      return;
    }

    await saveFavorite(toStoredTrack(track));

    setFavoriteTracks((current) => [...current, track]);
  };

  const handleEnqueue = async (track: StoredTrack) => {
    await enqueue(track);

    setQueue((current) => {
      if (!current) {
        return {
          id: 1,
          currentIndex: 0,
          tracks: [track],
          updatedAt: new Date(),
        };
      }

      const tracks = current.tracks.filter(
        ({ trackId }) => trackId !== track.trackId,
      );

      tracks.push(track);

      return {
        ...current,
        tracks,
        updatedAt: new Date(),
      };
    });
  };

  const handleDequeue = async (trackId: number) => {
    await dequeue(trackId);

    setQueue((current) => {
      if (!current) return null;

      return {
        ...current,
        tracks: current.tracks.filter((track) => track.trackId !== trackId),
        updatedAt: new Date(),
      };
    });
  };

  const handleClearQueue = async () => {
    await clearQueue();

    setQueue(null);
  };

  const handleSetCurrentTrack = async (index: number) => {
    if (!queue) return;

    if (index < 0 || index >= queue.tracks.length) return;

    const nextQueue = {
      ...queue,
      currentIndex: index,
      updatedAt: new Date(),
    };

    await saveQueue(nextQueue);

    setQueue(nextQueue);
  };

  const handleShuffle = async () => {
    if (!queue) return;

    const nextQueue = shuffleQueue(queue);

    setQueue(nextQueue);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[url('/background.png')] bg-center bg-cover bg-no-repeat font-sans">
      <main className="flex flex-1 w-full bg-black/10 backdrop-blur-md flex-col items-center justify-between py-32 px-16 sm:items-start">
        <SearchBar value={search} onChange={setSearch} />
        <div className={clsx("flex")}>
          <div>
            {album && (
              <div className="flex flex-row items-center justify-between w-full max-w-4xl -mt-12">
                <h1 className="text-2xl font-bold text-white mb-4">
                  {album?.collectionName}
                </h1>
                <button onClick={() => setSelectedAlbumId(null)}>
                  <Undo2
                    className={clsx("text-white hover:text-emerald-400")}
                  />
                </button>
              </div>
            )}
            <div className="flex">
            <Grid>
              {tracks
                ? tracks.length > 0 &&
                  tracks.map((track) => (
                    <TrackCard
                      key={track.trackId}
                      track={track}
                      handleEnqueue={handleEnqueue}
                    />
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
            <SideBar
              favoriteTracks={favoriteTracks}
              queue={queue}
              handleDequeue={handleDequeue}
              handleFavoriteState={handleFavoriteState}
            />
            </div>
          </div>
        </div>
        <Player
          track={queue?.tracks[queue.currentIndex]}
          favorites={favoriteIds}
          currentIndex={queue?.currentIndex}
          handleFavoriteState={handleFavoriteState}
          handleSetCurrentTrack={handleSetCurrentTrack}
          handleShuffle={handleShuffle}
        />
      </main>
    </div>
  );
}

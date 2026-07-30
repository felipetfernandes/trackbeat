"use client";

import { ApiTrack } from "@/lib/api/schemas/track.schema";
import { formatDurationFromMs } from "@/utils/formatDuration";
import clsx from "clsx";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  track: ApiTrack;
  handleEnqueue: (track: ApiTrack) => void;
};

function TrackCard({ track, handleEnqueue }: Props) {
  if (!track) return null
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-x-4 gap-y-2 items-center p-3 w-full not-odd:max-w-80",
        "bg-white/10 backdrop-blur-md border border-zinc-400/40 rounded-2xl shadow-lg hover:border-emerald-500 transition-shadow duration-300",
      )}
    >
      <Image
        src={track.artworkUrl100}
        alt={track.trackName}
        width={96}
        height={96}
        className={clsx("row-span-2 rounded-xl object-cover")}
      />

      <div className="flex flex-col justify-center self-start pt-1">
        <h1
          className={clsx(
            "text-lg font-bold text-white leading-tight line-clamp-1",
          )}
        >
          {track.trackName}
        </h1>
        <h3 className={clsx("text-sm text-zinc-300 line-clamp-1")}>
          {track.artistName}
        </h3>
        <h3 className={clsx("text-sm text-zinc-300 line-clamp-1")}>
          {track.collectionName}
        </h3>
        <h3 className={clsx("text-sm text-zinc-300 line-clamp-1")}>
          Time {formatDurationFromMs(track.trackTimeMillis)}
        </h3>
      </div>

      <div className="flex justify-end items-end">
        <button
          className="focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 bg-emerald-400 rounded-md p-2 drop-shadow-[0_0_4px_rgba(0,203,116,1)] hover:drop-shadow-[0_0_8px_rgba(52,211,153,1)]"
          onClick={() => handleEnqueue(track)}
        >
          <Play className="fill-black stroke-black size-4" />
        </button>
      </div>
    </div>
  );
}

export default TrackCard;

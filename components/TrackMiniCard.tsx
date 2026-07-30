import { StoredTrack } from "@/lib/api/schemas/track.schema";
import clsx from "clsx";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  type: "favorites" | "queue";
  track: StoredTrack;
  favorites?: Set<number>;
  handleFavoriteState?: (track: StoredTrack) => Promise<void>;
  handleDequeue?: (trackId: number) => Promise<void>;
};

function TrackMiniCard({
  track,
  type,
  handleFavoriteState,
  handleDequeue,
}: Props) {
  return (
    <div
      className={clsx(
        "border-none border-zinc-400/40 shadow-lg h-16 w-52 p-2 cursor-pointer",
        "hover:bg-emerald-500/60 transition-all duration-300",
        "flex gap-2 justify-between items-center",
      )}
    >
      <Image
        src={track.artworkUrl100}
        alt={track.trackName}
        width={40}
        height={40}
        className={clsx("row-span-2 rounded-xl object-cover")}
      ></Image>
      <div className={clsx("w-3/5")}>
        <h1
          className={clsx(
            "text-xs font-normal text-white leading-tight line-clamp-1",
          )}
        >
          {track.trackName}
        </h1>
        <h2 className={clsx("text-[10px] text-zinc-300 line-clamp-1")}>
          {track.artistName}
        </h2>
      </div>
      <button
        className={clsx(
          "focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 p-2",
        )}
        onClick={() =>
          type === "favorites"
            ? handleFavoriteState(track)
            : handleDequeue(track.trackId)
        }
      >
        {type === "favorites" ? (
          <Heart className={clsx("stroke-red-500 size-6", "fill-red-500")} />
        ) : (
          <X className={clsx("stroke-zinc-500 hover:stroke-red-900")} />
        )}
      </button>
    </div>
  );
}

export default TrackMiniCard;

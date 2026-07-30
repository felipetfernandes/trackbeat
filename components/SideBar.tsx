import { StoredTrack } from "@/lib/api/schemas/track.schema";
import React from "react";
import TrackMiniCard from "./TrackMiniCard";
import { Queue } from "@/lib/db";
import clsx from "clsx";

type Props = {
  favoriteTracks: StoredTrack[];
  queue: Queue;
  handleFavoriteState: (track: StoredTrack) => Promise<void>;
  handleDequeue: (trackId: number) => Promise<void>;
};

function SideBar({
  favoriteTracks,
  queue,
  handleFavoriteState,
  handleDequeue,
}: Props) {
  return (
    <div
      className={clsx(
        "hidden sm:flex",
        "bg-white/10 backdrop-blur-md shadow-lg rounded-2xl border border-zinc-400/40",
      )}
    >
      <div className={clsx("border-r border-zinc-400/40")}>
        <h1
          className={clsx(
            "p-2",
            "text-zinc-300 text-center",
            "border-b border-zinc-400/40",
            "hover:bg-white/40 rounded-tl-2xl",
          )}
        >
          FAVORITES
        </h1>
        {favoriteTracks.map((track) => (
          <TrackMiniCard
            key={track.trackId}
            track={track}
            type="favorites"
            handleFavoriteState={handleFavoriteState}
          />
        ))}
      </div>
      <div className={clsx("")}>
        <h1
          className={clsx(
            "p-2",
            "text-zinc-300 text-center",
            "border-b border-zinc-400/40",
            "hover:bg-white/40 rounded-tr-2xl",
          )}
        >
          QUEUE
        </h1>
        {queue &&
          queue.tracks.map((track, index) => {
            if (index >= queue.currentIndex) {
              return (
                <TrackMiniCard
                  key={track.trackId}
                  track={track}
                  type="queue"
                  handleFavoriteState={handleFavoriteState}
                  handleDequeue={handleDequeue}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default SideBar;

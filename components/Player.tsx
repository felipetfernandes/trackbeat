import { ApiTrack, StoredTrack } from "@/lib/api/schemas/track.schema";
import {
  formatDurationFromMs,
  formatDurationFromS,
} from "@/utils/formatDuration";
import clsx from "clsx";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  track: ApiTrack | null | StoredTrack;
  favorites: Set<number>;
  currentIndex: number;
  handleFavoriteState: (track: StoredTrack) => Promise<void>;
  handleSetCurrentTrack: (track: StoredTrack) => Promise<void>;
  handleShuffle: () => Promise<void>;
};

function Player({
  track,
  favorites,
  handleFavoriteState,
  handleSetCurrentTrack,
  handleShuffle,
  currentIndex,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!track) return null;

  const isLiked = favorites.has(track.trackId);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleCurrentTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (audioRef.current && track) {
      const newTimePercent = parseFloat(event.target.value);
      const newTime = track.trackTimeMillis * newTimePercent;
      const newTimeInSec = newTime / 1000;
      audioRef.current.currentTime = newTimeInSec;
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setIsMuted(newVolume === 0);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={clsx("w-full")}>
      {/* Elemento HTML5 Audio Oculto */}
      <audio
        ref={audioRef}
        src={track.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleSetCurrentTrack(++currentIndex)}
        loop={repeatMode}
        muted={isMuted}
        autoPlay
      />

      <div
        className={clsx(
          "bg-white/10 backdrop-blur-md border border-zinc-400/40 rounded-2xl shadow-lg",
          "flex justify-between w-full p-4",
        )}
      >
        {/* Seção 1: Informações da Track */}
        <div className={clsx("flex items-center gap-3 w-1/5")}>
          <Image
            src={track.artworkUrl100}
            alt={track.trackName}
            width={96}
            height={96}
            className={clsx("row-span-2 rounded-xl object-cover h-24 w-24")}
          />

          <div className="flex flex-col justify-center self-start pt-1 w-full">
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
          </div>

          <div className={clsx("flex justify-end items-end")}>
            <button
              className={clsx(
                "focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 p-2",
              )}
              onClick={() => handleFavoriteState(track)}
            >
              <Heart
                className={clsx(
                  "stroke-red-500 w-6 h-6",
                  isLiked ? "fill-red-500" : "",
                )}
              />
            </button>
          </div>
        </div>

        {/* Seção 2: Controles de Reprodução */}
        <div className={clsx("w-1/3 flex flex-col justify-center gap-3")}>
          <div className={clsx("flex items-center gap-5 justify-center")}>
            <button
              className={clsx("focus:outline-none")}
              onClick={() => handleShuffle()}
            >
              <Shuffle
                className={clsx(
                  "size-6  transition text-zinc-400 hover:text-emerald-500",
                )}
              />
            </button>
            <button
              className={clsx("transition focus:outline-none")}
              onClick={() => handleSetCurrentTrack(currentIndex + 1)}
            >
              <SkipBack
                className={clsx(
                  "size-6 fill-white stroke-white hover:fill-emerald-500 hover:stroke-emerald-500",
                )}
              />
            </button>
            <button
              className={clsx(
                "w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition focus:outline-none",
              )}
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className={clsx("size-5 fill-white stroke-white")} />
              ) : (
                <Play className={clsx("size-5 fill-white stroke-white")} />
              )}
            </button>
            <button
              className={clsx("transition focus:outline-none")}
              onClick={() => handleSetCurrentTrack(++currentIndex)}
            >
              <SkipForward
                className={clsx(
                  "size-6 fill-white stroke-white hover:fill-emerald-500 hover:stroke-emerald-500",
                )}
              />
            </button>
            <button
              className={clsx("focus:outline-none")}
              onClick={() => setRepeatMode((prev) => !prev)}
            >
              <Repeat
                className={clsx(
                  "size-6 transition",
                  repeatMode
                    ? "text-emerald-500 hover:text-emerald-300"
                    : "text-zinc-400 hover:text-white",
                )}
              />
            </button>
          </div>

          <div
            className={clsx(
              "flex items-center gap-3 text-zinc-200 text-sm font-light w-full px-2",
            )}
          >
            <span className={clsx("w-10")}>
              {formatDurationFromS(currentTime)}
            </span>

            <div
              className={clsx(
                "relative grow h-1 bg-neutral-700 rounded-full group cursor-pointer",
              )}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={handleCurrentTimeChange}
                className={clsx("absolute inset-y-0 opacity-0")}
              />
              <div
                className={clsx(
                  "absolute inset-y-0 grow h-1 bg-neutral-700 rounded-full group cursor-pointer pointer-events-none",
                )}
              ></div>
              <div
                className={clsx(
                  "absolute inset-y-0 left-0 bg-emerald-500 rounded-full pointer-events-none",
                )}
                style={{
                  width: `${((currentTime * 1000) / track.trackTimeMillis) * 100}%`,
                }}
              />
            </div>

            <span className={clsx("w-10")}>
              {formatDurationFromMs(track.trackTimeMillis)}
            </span>
          </div>
        </div>

        {/* Seção 3: Outros Controles (Fila, Volume) */}
        <div className={clsx("flex items-center gap-4 justify-end w-1/5")}>
          <button
            className={clsx(
              "flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-neutral-700/80 hover:bg-neutral-600 transition text-md text-white focus:outline-none",
            )}
          >
            <ListMusic size={20} />
            <span className={clsx("font-medium")}>Queue</span>
          </button>

          <div className={clsx("flex items-center gap-2.5 w-40")}>
            <button
              className={clsx(
                "text-neutral-400 hover:text-white focus:outline-none",
              )}
            >
              {isMuted ? (
                <VolumeOff onClick={() => setIsMuted((prev) => !prev)} />
              ) : (
                <Volume2
                  className={clsx("w-6 h-6 stroke-zinc-400 fill-zinc-400")}
                  onClick={() => setIsMuted((prev) => !prev)}
                />
              )}
            </button>
            <div
              className={clsx(
                "relative grow h-1 bg-neutral-700 rounded-full group cursor-pointer",
              )}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="absolute opacity-0 inset-0 w-full h-2 appearance-none cursor-pointer"
              />
              <div
                className={clsx(
                  "absolute inset-0 bg-emerald-500 rounded-full pointer-events-none",
                )}
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
              <div
                className={clsx(
                  "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#181818] border-2 border-white rounded-full group-hover:scale-110 transition-transform shadow-md pointer-events-none",
                )}
                style={{ left: `calc(${isMuted ? 0 : volume * 100}% - 8px)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

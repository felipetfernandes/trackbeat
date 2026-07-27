import clsx from 'clsx';
import React from 'react'

type Props = {}

function AlbumCardSkeleton({}: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-x-4 gap-y-2 items-center p-3 w-full max-w-80",
        "bg-white/10 backdrop-blur-md border border-zinc-400/40 rounded-2xl shadow-lg",
        "animate-pulse",
      )}
    >
      <div className="row-span-2 h-24 w-24 rounded-xl bg-zinc-300/20" />

      <div className="flex flex-col justify-center self-start pt-1 gap-2">
        <div className="h-5 w-40 rounded bg-zinc-300/20" />
        <div className="h-4 w-28 rounded bg-zinc-300/20" />
      </div>

      <div className="flex justify-end items-end">
        <div className="h-8 w-8 rounded-md bg-zinc-300/20" />
      </div>
    </div>
  );
}


export default AlbumCardSkeleton    
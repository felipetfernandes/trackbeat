import { ApiAlbum } from "@/lib/api/schemas/album.schema";
import clsx from "clsx";
import { ListMusic } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  album: ApiAlbum;
  selectAlbumId: (albumId: number) => void;
};

function AlbumCard({ album, selectAlbumId }: Props) {
  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-x-4 gap-y-2 items-center p-3 w-full max-w-80",
        "bg-white/10 backdrop-blur-md border border-zinc-400/40 rounded-2xl shadow-lg hover:border-emerald-500 transition-shadow duration-300",
      )}
    >
      <Image
        src={album.artworkUrl100}
        alt={album.collectionName}
        width={96}
        height={96}
        className={clsx("row-span-2 rounded-xl object-cover h-24 w-24")}
      />

      <div className="flex flex-col justify-center self-start pt-1">
        <h1
          className={clsx(
            "text-lg font-bold text-white leading-tight line-clamp-1",
          )}
        >
          {album.collectionName}
        </h1>
        <h3 className={clsx("text-sm text-zinc-300 line-clamp-1")}>
          {album.artistName}
        </h3>
      </div>

      <div className="flex justify-end items-end">
        <button className="focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95 bg-emerald-400 rounded-md p-2 drop-shadow-[0_0_4px_rgba(0,203,116,1)] hover:drop-shadow-[0_0_8px_rgba(52,211,153,1)]"
        onClick={() => selectAlbumId(album.collectionId)}>
          <ListMusic className="fill-black stroke-black size-4" />
        </button>
      </div>
    </div>
  );
}

export default AlbumCard;

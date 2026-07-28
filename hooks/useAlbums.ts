import { useQuery } from "@tanstack/react-query";

import { getAlbumById, getAlbumsByArtistName } from "@/lib/api/albums";

export function useAlbums(search: string) {
  return useQuery({
    queryKey: ["albums", search],

    queryFn: () => getAlbumsByArtistName(search),

    enabled: search.trim().length >= 2,
  });
}

export function useAlbumById(albumId: number | null) {
  return useQuery({
    queryKey: ["album", albumId],

    queryFn: () => getAlbumById(albumId),

    enabled: albumId !== null,
  });
}

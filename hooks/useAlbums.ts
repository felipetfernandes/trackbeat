import { useQuery } from "@tanstack/react-query";

import { getAlbumsByArtistName } from "@/lib/api/albums";

export function useAlbums(search: string) {
  return useQuery({
    queryKey: ["albums", search],

    queryFn: () => getAlbumsByArtistName(search),

    enabled: search.trim().length >= 2,
  });
}
import { get } from "./client";
import {
  lookupAlbumsByArtistId,
  lookupById,
  searchAlbumsByArtistName,
} from "./routes";

import {
  AlbumResponseSchema,
  AlbumWithTracksResponseSchema,
} from "./schemas/response.schema";

export async function getAlbumsByArtistName(artistName: string) {
  const response = await get(searchAlbumsByArtistName(artistName));

  return AlbumResponseSchema.parse(response);
}

export async function getAlbumsByArtistId(artistId: string) {
  const response = await get(lookupAlbumsByArtistId(artistId));

  return AlbumResponseSchema.parse(response);
}

export async function getAlbumById(albumId: number | null) {
  if (!albumId) return null;
  const response = await get(lookupById(albumId, "song"));

  return AlbumWithTracksResponseSchema.parse(response);
}

import { get } from "./client";
import {
  lookupAlbumsByArtistId,
  lookupById,
  searchAlbumsByArtistName,
} from "./routes";

import { AlbumSchema } from "./schemas/album.schema";
import { createResponseSchema } from "./schemas/response.schema";

const AlbumResponseSchema = createResponseSchema(AlbumSchema);

export async function getAlbumsByArtistName(artistName: string) {
  const response = await get(searchAlbumsByArtistName(artistName));

  console.log("response", response);

  return AlbumResponseSchema.parse(response);
}

export async function getAlbumsByArtistId(artistId: string) {
  const response = await get(lookupAlbumsByArtistId(artistId));

  return AlbumResponseSchema.parse(response);
}

export async function getAlbumById(albumId: string) {
  const response = await get(lookupById(albumId));

  return AlbumResponseSchema.parse(response);
}

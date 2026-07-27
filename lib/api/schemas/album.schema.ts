import { z } from "zod";

export const AlbumSchema = z.object({
  wrapperType: z.literal("collection"),

  collectionType: z.literal("Album"),

  collectionId: z.number(),
  collectionName: z.string(),

  artistId: z.number(),
  artistName: z.string(),

  artworkUrl100: z.string().url(),

  trackCount: z.number(),

  releaseDate: z.string(),
});

export type ApiAlbum = z.infer<typeof AlbumSchema>;
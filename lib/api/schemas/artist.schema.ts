import { z } from "zod";

export const ArtistSchema = z.object({
  wrapperType: z.literal("artist"),

  artistId: z.number(),
  artistName: z.string(),

  primaryGenreName: z.string().optional(),
});

export type ApiArtist = z.infer<typeof ArtistSchema>;
import { z } from "zod";

export const TrackSchema = z.object({
  wrapperType: z.literal("track"),
  kind: z.literal("song"),

  trackId: z.number(),
  trackName: z.string(),

  artistId: z.number(),
  artistName: z.string(),

  collectionId: z.number(),
  collectionName: z.string(),

  trackNumber: z.number(),

  previewUrl: z.string().url(),
  artworkUrl100: z.string().url(),

  trackTimeMillis: z.number(),
});

export const StoredTrackSchema = z.object({
  trackId: z.number(),
  trackName: z.string(),
  artistName: z.string(),
  artworkUrl100: z.string().url(),
  previewUrl: z.string().url(),
  trackTimeMillis: z.number(),
});

export type ApiTrack = z.infer<typeof TrackSchema>;
export type StoredTrack = z.infer<typeof StoredTrackSchema>;
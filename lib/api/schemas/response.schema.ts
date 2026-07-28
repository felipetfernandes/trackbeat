import { z } from "zod";

import { AlbumSchema } from "./album.schema";
import { TrackSchema } from "./track.schema";

export function createResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    resultCount: z.number(),
    results: z.array(schema),
  });
}

export const AlbumResponseSchema = createResponseSchema(AlbumSchema);

export const LookupResponseSchema = createResponseSchema(
  z.union([AlbumSchema, TrackSchema]),
);

export const AlbumWithTracksResponseSchema =
  createResponseSchema(
    z.union([AlbumSchema, TrackSchema]),
  );

export type ApiAlbumResponse = z.infer<typeof AlbumResponseSchema>;
export type ApiLookupResponse = z.infer<typeof LookupResponseSchema>;
export type ApiAlbumWithTracksResponse = z.infer<typeof AlbumWithTracksResponseSchema>;
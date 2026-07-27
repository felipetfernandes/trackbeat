import { z } from "zod";

import { get } from "./client";
import { lookupById } from "./routes";

import { AlbumSchema } from "./schemas/album.schema";
import { TrackSchema } from "./schemas/track.schema";
import { createResponseSchema } from "./schemas/response.schema";

const LookupResponseSchema = createResponseSchema(
  z.union([AlbumSchema, TrackSchema]),
);

export async function getTrackById(trackId: string) {
  const response = await get(lookupById(trackId));

  return LookupResponseSchema.parse(response);
}
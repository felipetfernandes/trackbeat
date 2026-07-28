import { get } from "./client";
import { lookupById } from "./routes";

import { LookupResponseSchema } from "./schemas/response.schema";

export async function getTrackById(trackId: number | null) {
  if (!trackId) return null;

  const response = await get(lookupById(trackId, "song"));

  return LookupResponseSchema.parse(response);
}
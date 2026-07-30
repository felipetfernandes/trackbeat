import { StoredTrack } from "@/lib/api/schemas/track.schema";

import { db } from "./database";

export async function saveFavorite(track: StoredTrack) {
  return db.favorites.put({
    trackId: track.trackId,
    track,
    addedAt: new Date(),
  });
}

export async function removeFavorite(trackId: number) {
  return db.favorites.delete(trackId);
}

export async function isFavorite(trackId: number) {
  return !!(await db.favorites.get(trackId));
}

export async function getFavorites() {
  return db.favorites.toArray();
}
import { ApiTrack, StoredTrack } from "@/lib/api/schemas/track.schema";

export interface FavoriteTrack {
  trackId: number;
  track: StoredTrack;
  addedAt: Date;
}

export interface Queue {
  id: number;
  currentIndex: number;
  tracks: StoredTrack[];
  updatedAt: Date;
}

import { ApiTrack, StoredTrack } from "../schemas/track.schema";

export function toStoredTrack(track: ApiTrack): StoredTrack {
  return {
    trackId: track.trackId,
    trackName: track.trackName,
    artistName: track.artistName,
    artworkUrl100: track.artworkUrl100,
    previewUrl: track.previewUrl,
    trackTimeMillis: track.trackTimeMillis,
  };
}

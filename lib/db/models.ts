export interface FavoriteTrack {
  trackId: number;

  addedAt: Date;
}

export interface Queue {
    id: number;
    currentIndex: number;
    tracks: number[];
    updatedAt: Date;
}

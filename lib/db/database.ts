import Dexie, { Table } from "dexie";

import { FavoriteTrack, Queue } from "./models";

export class TrackBeatDatabase extends Dexie {
  favorites!: Table<FavoriteTrack>;
  queue!: Table<Queue>;

  constructor() {
    super("TrackBeat");

    this.version(1).stores({
      favorites: "trackId",
      queue: "id",
    });
  }
}

export const db = new TrackBeatDatabase();

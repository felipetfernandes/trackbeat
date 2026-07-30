import { StoredTrack } from "@/lib/api/schemas/track.schema";

import { db, Queue } from ".";

export async function getQueue() {
  return db.queue.get(1);
}

export async function saveQueue(queue: Queue) {
  await db.queue.put(queue);
}

export async function clearQueue() {
  await db.queue.delete(1);
}

export async function enqueue(track: StoredTrack) {
  const queue = await getQueue();

  if (!queue) {
    await saveQueue({
      id: 1,
      currentIndex: 0,
      tracks: [track],
      updatedAt: new Date(),
    });

    return;
  }

  const tracks = queue.tracks.filter(
    ({ trackId }) => trackId !== track.trackId,
  );

  tracks.push(track);

  await saveQueue({
    ...queue,
    tracks,
    updatedAt: new Date(),
  });
}

export async function dequeue(trackId: number) {
  const queue = await getQueue();

  if (!queue) return;

  const tracks = queue.tracks.filter((track) => track.trackId !== trackId);

  await saveQueue({
    ...queue,
    tracks,
    updatedAt: new Date(),
  });
}

export function shuffleQueue(queue: Queue): Queue {
  const { currentIndex, tracks } = queue;

  const history = tracks.slice(0, currentIndex + 1);
  const upcoming = [...tracks.slice(currentIndex + 1)];

  for (let i = upcoming.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [upcoming[i], upcoming[j]] = [upcoming[j], upcoming[i]];
  }

  const newQueue = {
    ...queue,
    tracks: [...history, ...upcoming],
    updatedAt: new Date(),
  };

  saveQueue(newQueue);

  return newQueue;
}

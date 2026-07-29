import { db } from ".";

export async function getQueue() {
  return db.queue.get(1);
}

export async function saveQueue(queue: number[]) {
  await db.queue.put({
    id: 1,
    currentIndex: 0,
    tracks: queue,
    updatedAt: new Date(),
  });
}

export async function clearQueue() {
  await db.queue.delete(1);
}

export async function enqueue(trackId: number) {
  const queue = await getQueue();

  if (!queue) {
    await saveQueue([trackId]);
    return;
  }

  const tracks = queue.tracks.filter((id) => id !== trackId);

  tracks.push(trackId);

  await db.queue.put({
    ...queue,
    tracks,
    updatedAt: new Date(),
  });
}

export async function dequeue(trackId: number) {
  const queue = await getQueue();

  if (!queue) return;

  const tracks = queue.tracks.filter((id) => id !== trackId);

  await db.queue.put({
    ...queue,
    tracks,
    updatedAt: new Date(),
  });
}
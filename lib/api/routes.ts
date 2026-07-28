import { API_BASE_URL } from "./config";

const searchAlbumsByArtistName = (artistName: string) =>
  `${API_BASE_URL}search?term=${artistName.replaceAll("%20", "+")}&entity=album&attribute=allArtistTerm`;

const lookupAlbumsByArtistId = (artistId: string) =>
  `${API_BASE_URL}lookup?id=${artistId}&entity=album`;

const lookupById = (id: number, type: "song" | "album") => `${API_BASE_URL}lookup?id=${id}&entity=${type}`;

export { searchAlbumsByArtistName, lookupAlbumsByArtistId, lookupById };

import { API_BASE_URL } from "./config";

const searchAlbumsByArtistName = (artistName: string) =>
  `${API_BASE_URL}search?term=${artistName.replaceAll("%20", "+")}&entity=album&attribute=allArtistTerm`;

const lookupAlbumsByArtistId = (artistId: string) =>
  `${API_BASE_URL}lookup?id=${artistId}&entity=album`;

const lookupById = (id: string) => `${API_BASE_URL}lookup?id=${id}`;

export { searchAlbumsByArtistName, lookupAlbumsByArtistId, lookupById };

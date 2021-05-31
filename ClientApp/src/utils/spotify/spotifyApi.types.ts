export interface Artist {
  id: string;
  name: string;
}

export interface AlbumArt {
  height?: number | null;
  url: string;
  width?: number | null;
}

export interface Album {
  id: string;
  name: string;
  images: Array<AlbumArt>;
}

export interface Track {
  id: string;
  artists: Array<Artist>;
  name: string;
  duration: number;
  album: Album;
}

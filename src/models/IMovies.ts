export interface IMovie {
  adult: boolean;
  backdrop_path: any;
  genres: Array<{ id: number; name: string }>;
  genre_ids: Array<any>;
  backgroundImage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: any;
  release_date: string;
  runtime: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

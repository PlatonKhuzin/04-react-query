import axios from "axios";
import type { Movie } from "../types/movie";
export interface MovieSearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
export async function fetchMovies(
  query: string,
  page: number,
  signal?: AbortSignal,
): Promise<MovieSearchResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) throw new Error("TMDB token is missing");
  const { data } = await axios.get<MovieSearchResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query, page, include_adult: false, language: "en-US" },
      headers: { Authorization: `Bearer ${token}` },
      signal,
    },
  );
  return data;
}

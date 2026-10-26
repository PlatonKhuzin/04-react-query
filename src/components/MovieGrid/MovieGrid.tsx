import type { Movie } from "../../types/movie";
import type { KeyboardEvent } from "react";
import css from "./MovieGrid.module.css";
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
const fallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750'%3E%3Crect width='100%25' height='100%25' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='28'%3ENo poster available%3C/text%3E%3C/svg%3E";
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            aria-label={`Details for ${movie.title}`}
            onClick={() => onSelect(movie)}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(movie);
              }
            }}
          >
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : fallback
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

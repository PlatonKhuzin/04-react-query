import { useEffect, useRef } from "react";
import type { MouseEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function escape(event: globalThis.KeyboardEvent): void {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);
  function backdrop(event: MouseEvent<HTMLDivElement>): void {
    if (event.target === event.currentTarget) onClose();
  }
  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Tab") {
      event.preventDefault();
      closeRef.current?.focus();
    }
  }
  const imagePath = movie.backdrop_path || movie.poster_path;
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-title"
      onClick={backdrop}
      onKeyDown={trapFocus}
    >
      <div className={css.modal}>
        <button
          ref={closeRef}
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {imagePath && (
          <img
            src={`https://image.tmdb.org/t/p/original${imagePath}`}
            alt={movie.title}
            className={css.image}
          />
        )}
        <div className={css.content}>
          <h2 id="movie-title">{movie.title}</h2>
          <p>{movie.overview || "No overview available."}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "Unknown"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

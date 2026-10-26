import { useCallback, useEffect, useState } from "react";
import type { ComponentType } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import css from "./App.module.css";
type ModuleWithDefault<T> = { default: T };
const ReactPaginate =
  (
    ReactPaginateModule as unknown as ModuleWithDefault<
      ComponentType<ReactPaginateProps>
    >
  ).default ??
  (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);
export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isFetching, isError, isSuccess, refetch } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: ({ signal }) => fetchMovies(query, page, signal),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });
  const closeModal = useCallback((): void => setSelectedMovie(null), []);
  useEffect(() => {
    if (isSuccess && !isFetching && data.results.length === 0)
      toast("No movies found for your request.", { id: "no-movies" });
  }, [data, isSuccess, isFetching]);
  function search(nextQuery: string): void {
    toast.dismiss("no-movies");
    setSelectedMovie(null);
    if (nextQuery === query && page === 1) {
      void refetch();
      return;
    }
    setQuery(nextQuery);
    setPage(1);
  }
  function changePage({ selected }: { selected: number }): void {
    setSelectedMovie(null);
    setPage(selected + 1);
  }
  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 0, 500);
  return (
    <div className={css.app}>
      <SearchBar onSubmit={search} />
      {query && isFetching && <Loader />}
      {query && !isFetching && isError && <ErrorMessage />}
      {query && !isError && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={changePage}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel=">"
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          )}
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

import { DiscoverAPI } from "@/api/discoverAPI";
import { SearchAPI } from "@/api/searchAPI";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import ErrorPage from "@/pages/Error/ErrorPage";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { useNavigation, useSearchParams } from "react-router-dom";

function HomePage() {
  const navigate = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1", q: "" });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    // CALL API IF SEARCH-PARAMS CHANGES
    (async () => {
      const page = searchParams.get("page") || "1";
      const query = searchParams.get("q") || "";
      try {
        if (query === "") {
          // CALL DISCOVER API
          const res = await DiscoverAPI.GetAll(parseInt(page));
          setMovies(res.data.results);
        } else if (query.length > 1) {
          // CALL SEARCH API
          const res = await SearchAPI.SearchQuery(parseInt(page), query);
          setMovies(res.data.results);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, [searchParams]);

  const handlePagination = (type: "prev" | "next") => {
    const currentPage = parseInt(searchParams.get("page") || "1");
    let nextPage: number;
    if (type === "next") {
      nextPage = currentPage + 1;
    } else if (type === "prev") {
      nextPage = currentPage - 1;
    }
    setSearchParams((prev) => {
      prev.set("page", nextPage.toString() as string);
      return prev;
    });
  };

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <>
      {isLoading || navigate.state === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className='flex items-center gap-3 my-6 justify-end'>
            <button
              className='bg-primary text-white px-6 py-1 rounded cursor-pointer disabled:bg-slate-500 disabled:opacity-80 disabled:cursor-not-allowed'
              onClick={() => handlePagination("prev")}
              disabled={searchParams.get("page") === "1"}
            >
              Prev
            </button>
            <button
              className='bg-primary text-white px-6 py-1 rounded cursor-pointer'
              onClick={() => handlePagination("next")}
            >
              Next
            </button>
          </div>

          <div className='grid grid-cols-4 gap-7'>
            {movies.map((movie) => (
              <MovieCard
                title={movie.title}
                id={movie.id}
                imgPath={movie.backdrop_path}
                rating={movie.vote_average}
                key={movie.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;

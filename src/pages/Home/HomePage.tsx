import { DiscoverAPI } from "@/api/discoverAPI";
import { SearchAPI } from "@/api/searchAPI";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1", q: "" });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    // CALL API IF SEARCH-PARAMS CHANGES
    (async () => {
      const page = searchParams.get("page") || "1";
      const query = searchParams.get("q") || "";
      if (query === "") {
        // CALL DISCOVER API
        const res = await DiscoverAPI.GetAll(parseInt(page));
        setMovies(res.data.results);
      } else {
        // CALL SEARCH API
        const res = await SearchAPI.SearchQuery(parseInt(page), query);
        setMovies(res.data.results);
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button onClick={() => handlePagination("prev")}>Prev</button>
          <button onClick={() => handlePagination("next")}>Next</button>

          <br />

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

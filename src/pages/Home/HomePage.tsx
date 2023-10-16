import { DiscoverAPI } from "@/api/discoverAPI";
import { SearchAPI } from "@/api/searchAPI";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1", q: "" });
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      const page = searchParams.get("page") || "1";
      const query = searchParams.get("q") || "";
      if (query === "") {
        const res = await DiscoverAPI.GetAll(parseInt(page));
        setMovies(res.data.results);
      } else {
        const res = await SearchAPI.SearchQuery(parseInt(page), query);
        setMovies(res.data.results);
      }
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
      <button onClick={() => handlePagination("prev")}>Prev</button>
      <button onClick={() => handlePagination("next")}>Next</button>

      <br />

      <input
        type='text'
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />

      {movies.map((movie) => (
        <p>{movie.title}</p>
      ))}
    </>
  );
}

export default HomePage;

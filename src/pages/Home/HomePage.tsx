import { DiscoverAPI } from "@/api/discoverAPI";
import { SearchAPI } from "@/api/searchAPI";
import Loader from "@/components/Loader";
import MovieCard from "@/components/MovieCard";
import ErrorPage from "@/pages/Error/ErrorPage";
import { Movie } from "@/types";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigation, useSearchParams } from "react-router-dom";

let total_pages: number;

function HomePage() {
  const navigate = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1", q: "" });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1"),
    [searchParams]
  );
  const query = useMemo(() => searchParams.get("q") || "", [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    // CALL API IF SEARCH-PARAMS CHANGES
    (async () => {
      try {
        if (query === "") {
          // CALL DISCOVER API
          const res = await DiscoverAPI.GetAll(currentPage);
          setMovies(res.data.results);
          total_pages = Math.min(res.data.total_pages, 500);
        } else if (query.length > 1) {
          // CALL SEARCH API
          const res = await SearchAPI.SearchQuery(currentPage, query);
          setMovies(res.data.results);
          total_pages = Math.min(res.data.total_pages, 500);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    })();
  }, [currentPage, query]);

  // FOR PREV NEXT BUTTONS
  const handlePagination = useCallback(
    (type: "prev" | "next") => {
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
    },
    [currentPage, setSearchParams]
  );

  // FOR PAGINATION COMPONENT
  const handlePageClick = useCallback(
    (e: { selected: number }) => {
      const value = e.selected + 1;
      setSearchParams((prev) => {
        prev.set("page", value.toString() as string);
        return prev;
      });
    },
    [setSearchParams]
  );

  if (isLoading || navigate.state === "loading") {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (movies.length <= 0) {
    return <ErrorPage text='No movies found' />;
  }

  return (
    <>
      <div className='flex items-center justify-between my-6'>
        <div className='flex items-center gap-3'>
          <button
            className='bg-primary text-white px-6 py-1 rounded cursor-pointer disabled:bg-slate-500 disabled:opacity-80 disabled:cursor-not-allowed'
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 1}
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
        <ReactPaginate
          initialPage={parseInt(searchParams.get("page") || "1") - 1}
          breakLabel='...'
          nextLabel={<BiSolidRightArrow className='mx-2' />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={total_pages}
          previousLabel={<BiSolidLeftArrow className='mx-2' />}
          renderOnZeroPageCount={null}
          className='flex justify-center items-center font-semibold text-sm my-6 bg-violet-300 rounded-full w-fit px-6 py-3'
          pageClassName='mx-2 rounded ring-1 ring-black'
          pageLinkClassName='text-[#393939] text-xs w-6 h-6 grid place-content-center'
          activeClassName='ring-primary'
          activeLinkClassName='rounded text-white bg-primary'
          disabledClassName='text-slate-500'
        />
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
  );
}

export default HomePage;

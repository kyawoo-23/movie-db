import { DetailsAPI } from "@/api/detailsAPI";
import Pill from "@/components/Pill";
import { MovieDetailsResponse } from "@/types";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

function MovieDetails() {
  const res = useLoaderData() as MovieDetailsResponse;

  return (
    <>
      <div className='mt-14 relative'>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${res.backdrop_path}`}
          className='opacity-50 h-[500px] w-full object-cover'
          alt={res.title}
        />
        <div className='grid grid-cols-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-10'>
          <div className='col-span-1'>
            <img
              src={`https://image.tmdb.org/t/p/w342/${res.poster_path}`}
              className='h-[400px] rounded'
              alt={res.title}
            />
          </div>
          <div className='col-span-3 rounded bg-slate-950 bg-opacity-70 text-white p-8 flex flex-col gap-3'>
            <h2 className='text-2xl font-semibold'>{res.title}</h2>
            <div className='flex items-center gap-5 my-1'>
              <div className='rounded-full w-12 h-12 ring ring-primary grid place-content-center font-extrabold'>
                {res.vote_average.toFixed(1)}
              </div>
              <div className='flex items-center gap-3 flex-wrap'>
                {res.genres.map((g) => (
                  <Pill data={g.name} key={g.id} />
                ))}
              </div>
            </div>
            <div className='h-[160px]'>
              <p className='italic text-white text-[14px] text-opacity-70'>
                {res.tagline}
              </p>
              <h6 className='text-lg'>Overview</h6>
              <p className='text-sm mt-1 line-clamp-6 w-3/4'>{res.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;

interface ParamsType {
  params: {
    movie_id: number;
  };
}

export async function LoaderMovieDetails({
  params,
}: LoaderFunctionArgs<ParamsType>) {
  return (await DetailsAPI.GetDetails(parseInt(params.movie_id!))).data;
}

import { Link } from "react-router-dom";
import { MovieCardProps } from "./MovieCard";

export function MovieCard({ id, imgPath, rating, title }: MovieCardProps) {
  const renderStars = (count: number) => {
    const stars = [];
    for (let index = 1; index <= 10; index++) {
      if (index <= count) {
        if (count - index >= 0.5 && count - index < 1) {
          stars.push(<BsStarHalf />);
        } else {
          stars.push(<span className='text-primary'>★</span>);
        }
      } else {
        stars.push(<span>☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className='bg-slate-950 text-white rounded-lg overflow-hidden hover:ring-4 hover:ring-primary transition-all'>
      <div>
        <img
          className='object-cover'
          src={`https://image.tmdb.org/t/p/w400/${imgPath}`}
          alt={title}
        />
      </div>
      <div className='px-5 py-3'>
        <h3 className='truncate text-md'>{title}</h3>
      </div>
      <div className='px-5'>{renderStars(rating)}</div>
      <div className='flex justify-end p-3 pb-5'>
        <Link
          to={`/${id}`}
          className='mr-3 ring-1 ring-white px-4 py-2 text-xs rounded-full hover:bg-white hover:text-black transition-colors hover:animate-pulse font-semibold'
        >
          See more
        </Link>
      </div>
    </div>
  );
}
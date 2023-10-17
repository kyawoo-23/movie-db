import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams({ page: "1", q: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setTimeout(() => {
      navigate("/");
      setSearchParams({ q: e.target.value });
    }, 1000);
  };

  return (
    <div className='flex flex-row justify-between bg-slate-950 px-24 py-5'>
      <div className='text-white'>
        <Link to={"/"} className='font-bold font-mono text-xl'>
          TheMovieDB
        </Link>
      </div>
      <div>
        <input
          type='text'
          placeholder='Search movie...'
          className='shadow appearance-none border rounded w-[200px] py-1 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary caret-primary'
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e)}
        />
      </div>
    </div>
  );
}

export default Navbar;

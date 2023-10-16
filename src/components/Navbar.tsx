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
        <Link to={"/"}>MovieDB</Link>
      </div>
      <div>
        <input
          type='text'
          placeholder='Search movie...'
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e)}
        />
      </div>
    </div>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className='h-[500px] text-white grid place-content-center'>
      Oops, looks like there is an error
      <Link
        to={"/"}
        className='bg-primary text-white text-xl font-bold mt-4 rounded-md py-3 text-center'
      >
        Home
      </Link>
    </div>
  );
}

export default ErrorPage;

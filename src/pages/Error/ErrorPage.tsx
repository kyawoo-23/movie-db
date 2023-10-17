import { Link } from "react-router-dom";

function ErrorPage({ text = "Oops, looks like there is an error" }) {
  return (
    <div className='h-[500px] text-white grid place-content-center'>
      {text}
      <Link
        to={"/"}
        className='bg-primary text-white text-xl font-semibold mt-4 rounded-md py-2 text-center'
      >
        Home
      </Link>
    </div>
  );
}

export default ErrorPage;

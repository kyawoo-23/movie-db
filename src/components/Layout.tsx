import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <div className='max-w-[1440px] mx-auto'>
        <div className='px-20 mt-2'>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;

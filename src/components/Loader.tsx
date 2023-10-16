import { ThreeBody } from "@uiball/loaders";

function Loader() {
  return (
    <div className='w-full h-[500px] grid place-items-center'>
      <div className='flex flex-col items-center gap-5'>
        <ThreeBody size={35} speed={1.1} color='white' />
        <span className='font-semibold text-white'>Loading ...</span>
      </div>
    </div>
  );
}

export default Loader;

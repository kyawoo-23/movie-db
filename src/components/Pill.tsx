function Pill({ data }: { data: string }) {
  return (
    <span className='px-3 py-1 border border-white rounded-full text-xs'>
      {data}
    </span>
  );
}

export default Pill;

import { DiscoverAPI } from "@/api/discoverAPI";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  useEffect(() => {
    (async () => {
      const page = searchParams.get("page");
      if (page) {
        DiscoverAPI.GetAll(parseInt(page));
      }
    })();
  }, [searchParams]);

  return <div>{searchParams.get("page")}</div>;
}

export default HomePage;

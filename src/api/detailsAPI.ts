import { MovieAPI } from "@/api/config";
import { MovieDetails } from "@/types";

export const DetailsAPI = {
  GetDetails: async function (movie_id: number) {
    return await MovieAPI.get<MovieDetails>(`movie/${movie_id}`);
  },
};

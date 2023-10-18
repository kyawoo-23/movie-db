import { MovieAPI } from "@/api/config";
import { MovieDetailsResponse } from "@/types";

export const DetailsAPI = {
  GetDetails: async function (movie_id: number) {
    return await MovieAPI.get<MovieDetailsResponse>(`movie/${movie_id}`);
  },
};

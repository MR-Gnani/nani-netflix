import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

// 인기 영화 API 
const fetchDetailMovies = (movieId)=>{
    return api.get(`/movie/${movieId}`);
};

export const useMovieByIdQuery = (movieId)=>{
    console.log("movieId", movieId); // id별로 잘나옴.
    return useQuery({
        queryKey:[`movie-${movieId}`],
        queryFn:()=>fetchDetailMovies(movieId),
        select:(result)=>result.data,
    });
};
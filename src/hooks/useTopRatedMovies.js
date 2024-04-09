import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

// 인기 영화 API 
const fetchTopRatedMovies = ()=>{
    return api.get(`/movie/top_rated`);
};

export const useTopRatedMovieQuery = ()=>{
    return useQuery({
        queryKey:['movie-TopRated'],
        queryFn:fetchTopRatedMovies,
        select:(result)=>result.data,
    });
};
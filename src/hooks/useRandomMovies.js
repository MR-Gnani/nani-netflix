import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchAllMovies = (pageNum)=>{
    return api.get(`/movie/popular?page=${pageNum}`);
};

// 인기영화 페이지별로 가져오기
export const useAllMovieQuery = (pageNum)=>{
    return useQuery({
        queryKey:['movie-popByPage', pageNum],
        queryFn:()=>fetchAllMovies(pageNum),
        select:(result)=>result.data,
    });
};
import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";


const fetchReviewById = ({movieId})=>{
    return api.get(`/movie/${movieId}/reviews`);
};

export const useReviewByIdQuery = (movieId)=>{
    return useQuery({
        queryKey:[`movie-review`, movieId],
        queryFn:()=>fetchReviewById({movieId}),
        select:(result)=>result.data.results,
    });
};
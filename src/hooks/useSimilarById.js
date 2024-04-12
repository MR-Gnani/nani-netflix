import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";


const fetchSimilarById = ({movieId})=>{
    console.log("id잘받다옴?", movieId);
    return api.get(`/movie/${movieId}/similar`);
};

export const useSimilarByIdQuery = ({movieId})=>{
    return useQuery({
        queryKey:[`movie-similar`, movieId],
        queryFn:()=>fetchSimilarById({movieId}),
        select:(result)=>result.data.results,
    });
};
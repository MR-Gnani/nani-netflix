import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = ()=>{
    return api.get(`/genre/movie/list`)
}

export const useMovieGenreQuery=()=>{
    return useQuery({
        queryKey:['movie-genre'],
        queryFn: fetchMovieGenre,
        select:(result)=>result.data.genres,
        //장르 코드가 자주 변하는 것이 아니기 때문에 api호출을 자주 할 필요가 없음
        staleTime: 5000000,
    })
}
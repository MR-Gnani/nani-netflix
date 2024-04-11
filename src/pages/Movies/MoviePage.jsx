import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'
import {Alert} from "bootstrap";
import './MoviePage.style.css';
import MovieCards from '../../common/MovieCards/MovieCards';

// 영화 검색 창.
// navbar => popularMovie
// keyword search => keyword와 관련된 영화
const MoviePage = () => {
  // url에서 query가져오기
  const [query, setQuery] = useSearchParams()
  const keyword = query.get("q")
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword})
  console.log("keyword", data);
  if(isLoading){
    return <h1> Loading ... </h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
    }

  return (
    <div className='SearchPage'>
      <div className='filterSection'></div>
      <div className='resultSection'>
        {data?.results.map((movie, index)=><MovieCards key={index} movie={movie}/>)}
      </div>
    </div>
  )
}

export default MoviePage

import React from 'react'
import './SimpleMovieCards.style.css';
import {Alert} from "react-bootstrap";
import { useMovieByIdQuery } from '../hooks/useImageById';

const SimpleMovieCards = ({movieId, onClick, isSelected}) => {
    const {data, isLoading, isError, error} = useMovieByIdQuery(movieId);
    
    console.log("ddd", data);
    if(!data || !data.poster_path){
      // 포스터 경로가 없는 경우 랜더링 하지 않음.
      return null;
    }

    if(isLoading) {
      return <h1>Loading</h1>
     }
     if(isError){
      return <Alert variant="danger">{error.message}</Alert>;
     }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path})`,
      }}
      className='movie-card'
    >
    </div>
  )
}

export default SimpleMovieCards

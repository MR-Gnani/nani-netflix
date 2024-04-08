import React from 'react'
import {Badge} from 'react-bootstrap';
import './MovieCards.style.css'

// /8uUU2pxm6IYZw8UgnKJyx7Dqwu9.jpg
const MovieCards = ({movie}) => {
  return (
    <div
        style={{backgroundImage:"url("+
        `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`+
        ")",
    }}
    className='movie-card'
    >
      <div className='overlay'>
        <h1>{movie?.title}</h1>
        <div className='m-1'>
        {movie?.genre_ids.map((id)=>(<Badge bg='danger'>{id}</Badge>))}
            <div>{movie?.vote_average}</div>
            <div>{movie?.popularity}</div>
            <div>{movie?.adult? 'over18':'under18'}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCards

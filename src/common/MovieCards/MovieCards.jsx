import React from 'react'
import {Badge} from 'react-bootstrap';
import './MovieCards.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';


const MovieCards = ({movie}) => {
  const navigate = useNavigate();
  const showDetail = ()=>{
    navigate(`/movies/${movie?.id}`);
  }

  const { data:genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList)=>{
    if(!genreData) return [];

    const genreNameList = genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id);
      return genreObj.name;
    })

    return genreNameList
  }
  // console.log("genre", genreData);
  return (
    <div
        style={{backgroundImage:"url("+
        `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`+
        ")",
    }}
    className='movie-card'
    onClick={showDetail}
    >
      <div className='overlay'>
        <h1>{movie?.title}</h1>
        <div className='m-1'>
        {showGenre(movie?.genre_ids).map((id)=>(<Badge bg='danger'>{id}</Badge>))}
            <div>{movie?.vote_average}</div>
            <div>{movie?.popularity}</div>
            <div>{movie?.adult? 'over18':'under18'}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCards

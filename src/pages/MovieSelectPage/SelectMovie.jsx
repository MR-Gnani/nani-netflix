import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SelectMovie.style.css';
import SimpleMovieCards from '../../common/SimpleMovieCards';
import { useAllMovieQuery } from '../../hooks/useRandomMovies';
import {Alert} from "bootstrap";

/* SelecMovieCard를 선택할 경우 로컬 디비에 장르를 pk로 설정하고 count 적용 
  내가 좋아할 만한 영화 리스트에 count가 가장 많은 순으로 4, 3, 2, 1 11개 보여주기 */
let storedGenreId={};

const SelectMovie = () => {

  const [selectedMovies, setSelectedMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1); 
  const navigate = useNavigate();

  const selectFavoriteMovie = (movie)=>{
    if (selectedMovies.includes(movie.id)) {
      // 이미 선택된 카드인 경우 선택 취소
      setSelectedMovies(selectedMovies.filter(id => id !== movie.id));
    } else {
      // 새로운 카드를 선택한 경우 선택 추가
      setSelectedMovies([...selectedMovies, movie.id]);
    }

    movie.genre_ids.forEach((genreId)=>{
      storedGenreId[genreId] = (storedGenreId[genreId] || 0) + 1;
    });
    
    const updatedGenreId = JSON.stringify(storedGenreId);
    // 로컬에 좋아하는 장르 id 저장.
    localStorage.setItem(`favoriteGenre`, updatedGenreId);
  }

  const handleButtonClick = () => {
    navigate('/main'); // Main 페이지로 이동
  };

  const {data, isLoading, isError, error} = useAllMovieQuery(pageNum);

    if(isLoading){
    return <h1> Loading ... </h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
    }

  return (
    <div>
        <div className='selectSection'>
            <div className='TopSection'>
                <h1>Please select the movie you are interested in!</h1>
                <div className='buttonSection'>
                    {/* 5이하일 경우 disable걸기 , 선택된 영화 갯수가 5이상되면 클릭 가능하게, 메인페이지로 이동(제출) */}
                    {selectedMovies.length < 5 
                    ? (<Button disabled className='m-2' onClick={handleButtonClick}> {5-selectedMovies.length}개 더 골라주세요!</Button>) 
                    : (<Button className='m-2' onClick={handleButtonClick}> 영화보러가자!</Button>) }
                    <Button onClick={()=>setPageNum(pageNum+1)}> Next </Button>
                </div>  
            </div>
            <div className='gridMovieList'>
            {data.results.map((movie)=>
            (<div onClick={()=> selectFavoriteMovie(movie)}
                  className={selectedMovies.includes(movie.id) ? 'selected' : ''}>
              <SimpleMovieCards
                key={movie.id} 
                movieId={movie.id}
              />
            </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default SelectMovie

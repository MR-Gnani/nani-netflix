import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SelectMovie.style.css';
import SimpleMovieCards from '../../common/SimpleMovieCards';
import { useAllMovieQuery } from '../../hooks/useRandomMovies';
import {Alert} from "bootstrap";

const SelectMovie = () => {
  const [pageNum, setPageNum] = useState(1); 
  const navigate = useNavigate();
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
        <Container className='selectSection'>
            <div className='TopSection'>
                <h1>Please select the movie you are interested in!</h1>
                <div className='buttonSection'>

                    {/* 5이하일 경우 disable걸기 , 선택된 영화 갯수가 5이상되면 클릭 가능하게, 메인페이지로 이동(제출) */}
                    {/* SelecMovieCard를 선택할 경우 로컬 디비에 장르를 pk로 설정하고 count 적용 
                    내가 좋아할 만한 영화 리스트에 count가 가장 많은 순으로 4, 3, 2, 1 11개 보여주기 */}
                    <Button className='m-2' onClick={handleButtonClick}> Select at least 5</Button>
                    <Button onClick={()=>setPageNum(pageNum+1)}> Next </Button>
                </div>  
            </div>
            <div className='gridMovieList'>
            {data.results.map((movie)=>
            (<SimpleMovieCards
                key={movie.id} 
                movieId={movie.id}
            />
            ))}
            </div>
        </Container>
    </div>
  )
}

export default SelectMovie

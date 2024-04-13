import React from 'react';
import Banner from './components/Banner/Banner';
import {Container} from 'react-bootstrap';
import PopularMovieSlides from './components/Slides/PopularMovieSlides';
import TopRatedMovieSlides from './components/Slides/TopRatedMovieSlides';
import UpComingMovieSlides from './components/Slides/UpComingMovieSlides';

// 1. banner => popular영화의 첫번째 아이템
// ++ 추천 영화 알고리즘
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const MainPage = () => {

  // const storedGenre = localStorage.getItem('favoriteGenre');
  // console.log(JSON.parse(storedGenre));

  return (
    <div className='mainPage'>
      <Container>
        <Banner/>
        
        <UpComingMovieSlides/>
        <TopRatedMovieSlides/>
        <PopularMovieSlides/>
      </Container>
    </div>
  )
}

export default MainPage

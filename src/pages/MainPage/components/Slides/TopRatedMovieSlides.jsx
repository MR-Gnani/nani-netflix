import React from 'react'
import { useTopRatedMovieQuery } from '../../../../hooks/useTopRatedMovies'
import {Alert} from "bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constant/responsive';


const TopRatedMovieSlides = () => {
   const {data, isLoading, isError, error } = useTopRatedMovieQuery();
   if(isLoading) {
    return <h1>Loading</h1>
   }
   if(isError){
    return <Alert variant="danger">{error.message}</Alert>;
   }

  return (
    <div>
      <MovieSlider title='TopRated movies' movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMovieSlides

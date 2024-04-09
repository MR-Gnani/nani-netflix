import React from 'react'
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComingMovies'
import {Alert} from "bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constant/responsive';

const UpComingMovieSlides = () => {
    const {data, isLoading, isError, error} = useUpComingMoviesQuery();
    if(isLoading) {
        return <h1>Loading</h1>
       }
       if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
       }
    
  return (
    <div>
      <MovieSlider title='Upcoming Movies' movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default UpComingMovieSlides

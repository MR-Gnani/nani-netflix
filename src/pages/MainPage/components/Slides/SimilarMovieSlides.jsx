import React from 'react'
import {Alert} from "bootstrap";
import 'react-multi-carousel/lib/styles.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constant/responsive';
import { useSimilarByIdQuery } from '../../../../hooks/useSimilarById';

const SimilarMovieSlides = (id) => {
   const {data, isLoading, isError, error} = useSimilarByIdQuery(id)
   if(isLoading) {
    return <h1>Loading</h1>
   }
   if(isError){
    return <Alert variant="danger">{error.message}</Alert>;
   }
  return (
    <div>
      <MovieSlider title='Similar movies' movies={data} responsive={responsive}/>
    </div>
  )
}

export default SimilarMovieSlides

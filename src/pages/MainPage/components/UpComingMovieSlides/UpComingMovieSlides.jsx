import React from 'react'
import { useUpComingMoviesQuery } from '../../../../hooks/useUpComingMovies'
import {Alert} from "bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCards from '../MovieCards/MovieCards';
import './UpComingMovieSlides.style.css';

const UpComingMovieSlides = () => {
    const {data, isLoading, isError, error} = useUpComingMoviesQuery();
    
    if(isLoading) {
        return <h1>Loading</h1>
       }
       if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
       }
    
       const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
  return (
    <div className='mt-4'>
      <h3>Upcoming Movies</h3>
      <Carousel
        infinite={false}
        centerMode={true}
        itemClass='movie-slider p-1 card-custom'
        containerClass='carousel-container'
        responsive={responsive}
      >
    {data?.results.map((movie, index)=><MovieCards movie={movie} key={index}/>)}
      </Carousel>
    </div>
  )
}

export default UpComingMovieSlides

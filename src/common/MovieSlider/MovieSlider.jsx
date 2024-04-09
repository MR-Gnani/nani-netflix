import React from 'react'
import "./MovieSlider.style.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCards from '../MovieCards/MovieCards';


const MovieSlider = ({title, movies, responsive}) => {
  return (
    <div className='mt-4'>
      <h3>{title}</h3>
      <Carousel
        infinite={false}
        centerMode={true}
        itemClass='movie-slider p-1 card-custom'
        containerClass='carousel-container'
        responsive={responsive}
      >
    {movies?.map((movie, index)=><MovieCards movie={movie} key={index}/>)}
      </Carousel>
    </div>
  )
}

export default MovieSlider

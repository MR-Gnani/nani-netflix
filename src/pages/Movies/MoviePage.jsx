import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'
import {Alert} from "bootstrap";
import {Form} from "react-bootstrap";
import './MoviePage.style.css';
import MovieCards from '../../common/MovieCards/MovieCards';
import ReactPaginate from 'react-paginate';

// 영화 검색 창.
// navbar => popularMovie
// keyword search => keyword와 관련된 영화
const MoviePage = () => {

  const [rating, setRating] = useState(5);
  const [popularity, setPopularity] = useState(50);
  const [year, setYear] = useState(2020);
  const genres = [
    "Action", "Romance", "Comedy", "War", "Science Fiction",
    "Fantasy", "Crime", "Thriller", "Animation", "Horror"
  ];
  const[page, setPage] = useState(1);

  // url에서 query가져오기
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q")
  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page})
  console.log("keyword", data);
  if(isLoading){
    return <h1> Loading ... </h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const RangeSlider = ({ label, min, max, step, value, onChange }) => {
      return (
        <Form.Group>
          <Form.Label>{label}</Form.Label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="form-range"
            style={{ cursor: 'pointer' }} // 커서 스타일 변경
          />
          <Form.Label>{value}</Form.Label>
        </Form.Group>
      );
    };
  
  const handlePageClick = ({selected})=>{
    setPage(selected+1);
  };

  return (
    <div className='SearchPage'>
      <div className='mainSection'>
        <div className='filterSection'>
          <div className='sortDiv'>
            <h3>정렬</h3>
            <div className='labelSection'>
            <label> <input className="margin" type="radio" name="gender" value="male"/>인기순</label>
            <label> <input className="margin" type="radio" name="gender" value="female"/>평점순</label>
            <label> <input className="margin" type="radio" name="gender" value="other" />최신순</label>
            </div>
          </div>
          <div className='genreDiv'>
            <h3>장르</h3>
            {genres.map((genre, index) => (
              <div  className='' key={index}>
                <input type="checkbox" id={`genre-${index}`} name={`genre-${index}`} />
                <label htmlFor={`genre-${index}`}>{genre}</label>
              </div>
            ))}
            <div className='none'> . </div>
          </div>
          <RangeSlider 
            label="Rating" 
            min={0} 
            max={10} 
            step={0.1} 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
          />
          <RangeSlider 
            label="Popularity" 
            min={0} 
            max={100} 
            step={1} 
            value={popularity} 
            onChange={(e) => setPopularity(e.target.value)} 
          />
          <RangeSlider 
            label="Year" 
            min={1900} 
            max={new Date().getFullYear()} 
            step={1} 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
          />
        </div>
        <div className='resultSection'>
          {data?.results.map((movie, index)=><MovieCards key={index} movie={movie}/>)}
        </div>
      </div>
      <div className='pageSection'>
      <ReactPaginate
        className=''
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages} // 전체 페이지
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page-1}
      />
      </div>
      
    </div>
  )
}

export default MoviePage

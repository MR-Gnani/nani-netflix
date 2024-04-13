import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'
import {Alert} from "bootstrap";
import {Form} from "react-bootstrap";
import './MoviePage.style.css';
import MovieCards from '../../common/MovieCards/MovieCards';
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const CURRENT_YEAR = new Date().getFullYear();

// 영화 검색 창.
// navbar => popularMovie,, keyword search => keyword와 관련된 영화
const MoviePage = () => {

  // state
  const [data, setData] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const [rating, setRating] = useState(5);
  const [popularity, setPopularity] = useState(50);
  const [year, setYear] = useState([0, CURRENT_YEAR]);
  const[page, setPage] = useState(1);
  const [genreId, setGenreId] = useState([]);
  
  // url query + API
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q")
  const {data: movieList, isLoading, isError, error} = useSearchMovieQuery({keyword, page})
  const {data: genreData} = useMovieGenreQuery();

  // function
  // 왼쪽 slider 함수
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

  // 영화 정렬 함수
  const sortMovie = ()=>{
    let sortedData;
    switch(sortValue){
      case 'popularity':
        sortedData = [...data.results].sort(
          (a, b) => b.popularity - a.popularity
        );
        setData({...data, results: sortedData});
        return;
      case 'vote':
        sortedData = [...data.results].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setData({...data, results: sortedData});
        return;
      case 'latest':
        sortedData = [...data.results].sort(
          (a,b)=>
            Number(b.release_date.split('-').join('')) -
            Number(a.release_date.split('-').join(''))
        );
        setData({...data, results: sortedData});
        return;
      default:
        return;
    }
  };

  // 장르선택 상태값 설정 함수
  const handleGenreChange = (e,gId)=>{
    if (e.target.checked) {
      // 체크박스가 선택된 경우
      setGenreId([...genreId, gId]);
    } else {
      // 체크박스가 해제된 경우
      setGenreId(genreId.filter(id => id !== gId));
    }
  }
  
  // 페이지 핸들 함수
  const handlePageClick = ({selected})=>{
    setPage(selected+1);
    setSortValue('');
    setGenreId([]);
    setYear([0, CURRENT_YEAR]);
  };

  // 정렬 상태값 설정 함수
  const handleSortChange = (e)=>{
    setSortValue(e.target.value);
  }

  useEffect(()=>{
    if(sortValue !== ''){
      sortMovie();
    } else if(movieList) {
      setData(movieList);
    }
  },[sortValue, movieList]);

  // useEffect 뒤에 와야함.
  if(isLoading){
    return <h1> Loading ... </h1>
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>;
    }

  return (
    <div className='SearchPage'>
      <div className='mainSection'>
        <div className='filterSection'>
          <div className='sortDiv'>
            <h3>정렬</h3>
            <div className='labelSection'>
            <label> <input className="margin" type="radio" checked={sortValue === 'popularity'} onChange={handleSortChange} name="popularity" value="popularity"/>인기순</label>
            <label> <input className="margin" type="radio" checked={sortValue === 'vote'} onChange={handleSortChange} name="vote" value="vote"/>평점순</label>
            <label> <input className="margin" type="radio" checked={sortValue === 'latest'} onChange={handleSortChange} name="latest" value="latest" />최신순</label>
            </div>
          </div>
          <div className='genreDiv'>
            <h3>장르</h3>
            {genreData.map((item, index) => (
              <div  className='' key={index}>
                <input type="checkbox" id={`genre-${index}`} name={`genre-${index}`}
                checked={genreId.includes(item.id)}
                onChange={(e) => handleGenreChange(e, item.id)} />
                <label htmlFor={`genre-${index}`}>{item.name}</label>
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
            max={5000} 
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
          {data?.results
          .filter((item)=>genreId.every((i)=>item.genre_ids.includes(i)))
          ?.map((movie, index)=><MovieCards key={index} movie={movie}/>)}
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

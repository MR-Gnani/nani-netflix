import React, {useState} from 'react'
import './MovieDetailPage.style.css';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useMovieByIdQuery } from '../../hooks/useImageById';
import { useParams } from 'react-router-dom'
import { useReviewByIdQuery } from '../../hooks/useReviewById';
import SimilarMovieSlides from '../MainPage/components/Slides/SimilarMovieSlides';

const MovieDetailPage = () => {
  // 리뷰 란의 숨김/보임 상태를 관리하는 useState 훅
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  // 리뷰 란을 토글하는 함수
  const toggleReviewVisibility = () => {
    setIsReviewVisible(!isReviewVisible);
  };

  // url에서 id값 가져오기
  let {id} = useParams();
 
  const {data} = useMovieByIdQuery(id);
  const {data:review} = useReviewByIdQuery(id);
  const year = data?.release_date.split("-")[0];
  console.log(review);

  return (
    <div className='detailSection'>
      <div className='detailInfo'>
        <div className='textSection'>
          <h1>{data?.title}</h1>
          <div>
            <Button className="m-1"variant="outline-light">ALL</Button>
            {data?.genres.map((genre)=>(
              <Button className="m-1"variant="outline-light">{genre.name}</Button>
            ))}
            <Button className="m-1"variant="outline-light">{data?.runtime}m</Button>
            <Button className="m-1"variant="outline-light">{year}</Button>
          </div>
          <div className='text-3'>
            <Button className="m-1 shorts" variant="light">예고편 보기</Button>
            <div className='text-3-icon'>
              <FontAwesomeIcon icon={faHeart} className='m-1'/>
              <FontAwesomeIcon icon={faShareFromSquare} className='m-1'/>
            </div>
          </div>
          <div>{data?.overview}</div>
        </div>
        <div className='imageSection'>
          <img src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}`} alt=''/>
        </div>
      </div>
      <div className='review'>
        {/* 리뷰 란 헤더와 토글 아이콘 */}
        <div className='reviewHeader' onClick={toggleReviewVisibility}>
          <span className="m-2">Review</span>
          <FontAwesomeIcon icon={isReviewVisible ? faAngleUp : faAngleDown} />
        </div>
        {/* 리뷰 목록 */}
        {isReviewVisible && review?.map((review)=>(
          <div className='reviewDetail m-2' key={review.id}>
            <h3>{review.author}</h3>
            <div>{review.content}</div>
          </div>
        ))}
      </div>
      <div className='relatedMovie'>
          <SimilarMovieSlides movieId={id}/>
      </div>
    </div>
  )
}

export default MovieDetailPage

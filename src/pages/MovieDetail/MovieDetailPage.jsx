import React, {useState} from 'react'
import './MovieDetailPage.style.css';
import { Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useMovieByIdQuery } from '../../hooks/useImageById';
import { useParams } from 'react-router-dom'
import { useReviewByIdQuery } from '../../hooks/useReviewById';
import SimilarMovieSlides from '../MainPage/components/Slides/SimilarMovieSlides';
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer';

const MovieDetailPage = () => {
  // 리뷰 란의 숨김/보임 상태를 관리하는 useState 훅
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  // 리뷰 란을 토글하는 함수
  const toggleReviewVisibility = () => {
    setIsReviewVisible(!isReviewVisible);
  };

  // url에서 id값 가져오기
  let {id} = useParams();
 
  const [show, setShow] = useState(false); 
  const {data: video} = useMovieTrailerQuery(id); 
  const {data} = useMovieByIdQuery(id);
  const {data:review} = useReviewByIdQuery(id);
  const year = data?.release_date.split("-")[0];
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1, 
    },
  };

  return (
    <div className='detailSection'>
      <div className='detailInfo'>
        <div className='textSection'>
          <h1>{data?.title}</h1>
          <div>
            <Button className="m-1"variant="warning">ALL</Button>
            {data?.genres.map((genre)=>(
              <Button className="m-1"variant="outline-light">{genre.name}</Button>
            ))}
            <Button className="m-1"variant="outline-light">{data?.runtime}m</Button>
            <Button className="m-1"variant="outline-light">{year}</Button>
            <Button className="m-1"variant="danger">{data?.vote_average.toFixed(1)}</Button>
          </div>
          <div className='text-3'>
            <Button className="m-1 shorts" variant="light" onClick={() => setShow(true)}>
              트레일러 보기
            </Button>
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
      <Modal
        show={show}
        centered={true}
        onHide={() => setShow(false)}
        dialogClassName='modal-90w'
        contentClassName='modal-style'
      >
        <Modal.Header closeVariant='white' closeButton />
        <Modal.Body>
          <YouTube
            videoId={video && video[0]?.key}
            opts={opts}
            style={{ height: '100%' }}
            onReady={(event) => event.target.mute()}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default MovieDetailPage

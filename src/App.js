import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import MainPage from './pages/MainPage/MainPage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SelectMovie from './pages/MovieSelectPage/SelectMovie';

// Branch Test 
// Main 페이지
// Search 페이지
// Detail 페이지
function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout/>}>
        {/* 영화 고르기 페이지 */}
        <Route index element={<SelectMovie/>}/>

        {/* 메인 페이지 */}
        <Route path='main' element={<MainPage/>}/>

        {/* 영화 상세 페이지 */}
        <Route path='movies'>
          <Route index element={<MoviePage/>}/>
          <Route path=':id' element={<MovieDetailPage/>}/>
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;

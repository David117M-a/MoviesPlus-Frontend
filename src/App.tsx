import './App.css';
import MoviesContextProvider from './store/movies-context';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateMoviePage from './pages/CreateMoviePage';

function App() {
  return (
    <MoviesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-movie" element={<CreateMoviePage />} />
        </Routes>
      </BrowserRouter>
    </MoviesContextProvider>
  );
}

export default App;

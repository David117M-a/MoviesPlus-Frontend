import { useContext } from "react";
import Movie from "./Movie";
import { MoviesContext } from "../store/movies-context";
import './Movies.css';

const Movies: React.FC = () => {
    const moviesCtx = useContext(MoviesContext);

    return (
        <div className="movies-wrapper">
            {moviesCtx.movies.map(m => <Movie key={m.id} title={m.title} genre={m.genre} cover={m.cover} />)}
        </div>
    );
}

export default Movies;
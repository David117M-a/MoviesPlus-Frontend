import React, { useEffect, useState } from "react";
import Movie from "../models/Movie";

type MoviesContextObj = {
    movies: Movie[];
    filterMovies: (title: string, genre: number, actor: number) => void;
    createMovie: (movie: Movie) => void;
}

export const MoviesContext = React.createContext<MoviesContextObj>({
    movies: [],
    filterMovies: (title: string, genre: number, actor: number) => { },
    createMovie: (movie: Movie) => { }
});

const MoviesContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getAllMovies();
    }, []);

    const filterMoviesHandler = (title: string, genre: number, actor: number) => {
        fetch(`${process.env.REACT_APP_API_URL}/movies/byMultipleFilters?title=${title}&genreId=${genre}&actorId=${actor}`)
            .then(res => res.json())
            .then(data => setMovies(data));
    };

    const getAllMovies = () => {
        fetch(`${process.env.REACT_APP_API_URL}/movies`)
            .then(res => res.json())
            .then(data => setMovies(data));
    };

    const createMovieHandler = (movie: Movie) => {
        fetch(`${process.env.REACT_APP_API_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure server knows we're sending JSON
            },
            body: JSON.stringify(movie)
        })
            .then(res => res.json())
            .then(data => setMovies([...movies, data]));
    };

    // TODO - handle api exceptions
    
    const contextValue: MoviesContextObj = {
        movies,
        filterMovies: filterMoviesHandler,
        createMovie: createMovieHandler
    }

    return <MoviesContext.Provider value={contextValue}>{props.children}</MoviesContext.Provider>
}

export default MoviesContextProvider;
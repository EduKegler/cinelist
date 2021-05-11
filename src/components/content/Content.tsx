import React from 'react';
import { useSearchMovie } from '../contexts/SearchContextProvider';
import { MovieCard } from '../movieCard/MovieCard';
import './content.scss';

export const Content = React.memo(() => {
    const { movies } = useSearchMovie();
    return (
        <div className="cl-content">
            <div className="cl-content__movies">
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>)
});
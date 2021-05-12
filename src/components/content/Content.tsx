import React from 'react';
import { useSearchMovie } from '../contexts/SearchContextProvider';
import { MovieThumb } from '../movieThumb/MovieThumb';
import './content.scss';

export const Content = React.memo(() => {
    const { movies } = useSearchMovie();
    return (
        <div className="cl-content">
            <div className="cl-content__movies">
                {movies.map(movie => <MovieThumb key={movie.id} movie={movie}/>)}
            </div>
        </div>)
});
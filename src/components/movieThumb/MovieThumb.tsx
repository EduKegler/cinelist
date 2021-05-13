import React from 'react';
import { Movie, MovieCard } from '../movieCard/MovieCard';
import { useSwitch } from '../../helpers/util';

import './movieThumb.scss'

export interface MovieThumbProps {
    movie: Movie;
}

export const MovieThumb = React.memo((props: MovieThumbProps) => {
    const { movie } = props;

    const visible = useSwitch();
    return (
        <div
            className={`cf-movieThumb`}
            onClick={() => visible.onChange(true)}
            onMouseLeave={() => visible.onChange(false)}
        >
            <img
                src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`}
                alt='movie'
            />
            <span className="cf-movieThumb__details">Details</span>
            <MovieCard movie={movie} isVisible={visible.value}/>
        </div>
    )
});
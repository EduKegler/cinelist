import React from 'react';
import './movieThumb.scss';
import { Movie, MovieCard } from '../movieCard/MovieCard';
import { useSwitch } from '../../helpers/util';

export interface MovieThumbProps {
    movie: Movie;
}

export const MovieThumb = React.memo((props: MovieThumbProps) => {
    const { movie } = props;

    const visible = useSwitch();

    return (
        <div
            className="cf-movieThumb"
            // onMouseLeave={() => visible.onChange(false)}
            onClick={() => visible.onChange(true)}
        >
            <img
                src={`https://www.themoviedb.org/t/p/w185/${movie.poster_path}`}
                alt='movie'
            />
            <MovieCard movie={movie} isVisible={visible.value} />
        </div>
    )
});
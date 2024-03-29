import React from 'react';
import { Movie, MovieCard } from '../movieCard/MovieCard';
import { useSwitch } from '../../helpers/util';
import notFoundPoster from '../../assets/images/notFound185w.png'
import './movieThumb.scss'

export interface MovieThumbProps {
    movie: Movie;
}

export const MovieThumb = React.memo((props: MovieThumbProps) => {
    const { movie } = props;

    const visible = useSwitch();
    return (
        <React.Fragment>
            <div
                className={`cf-movieThumb`}
                onClick={() => visible.onChange(true)}
            >
                <img
                    loading="lazy"
                    src={movie.poster_path ? `https://www.themoviedb.org/t/p/w185/${movie.poster_path}` : 
                        notFoundPoster
                    }   
                    alt='movie'
                />
                <span className="cf-movieThumb__details">Details</span>
                <MovieCard movie={movie} isVisible={visible.value} />
            </div>
            <div
                className={`cl-movieThumb__background${visible.value ? ' cl-movieThumb__background--open' : ''}`}
                // onClick={() => console.log('test')}
                onClick={() => visible.onChange(false)}
            />
        </React.Fragment>
    )
});
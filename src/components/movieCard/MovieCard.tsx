import React from 'react';
import './movieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faChartPie, faPlay, faPlusSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { useConfig } from '../contexts/ConfigContextProvider';

export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieCardProps {
    movie: Movie;
    isVisible: boolean;
}

export const MovieCard = React.memo((props: MovieCardProps) => {
    const { movie, isVisible } = props;

    const { getGenreById } = useConfig();

    return (
        <div className={`cl-movieCard ${isVisible ? '' : 'cl-movieCard--hide'}`}>
            <div className="cl-movieCard__header">
                <div className='cl-movieCard__title'>{movie.title}</div>
                <div className='cl-movieCard__categories'>
                    {movie.genre_ids.map(genreId => getGenreById(genreId)).join(' - ')}
                </div>
            </div>
            <div className="cl-movieCard__overview">
                <b>Overview:</b>
                <p>{movie.overview ?? 'Nothing here yet.'}</p>
            </div>
            <div className="cl-movieCard__actions">
                <FontAwesomeIcon icon={faChartPie} />
                <FontAwesomeIcon icon={faPlusSquare} />
                <FontAwesomeIcon icon={faBookmark} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="cl-movieCard__watch">
                <FontAwesomeIcon icon={faPlay} />Trailer
                    <FontAwesomeIcon icon={faPlay} />Watch
            </div>
        </div>)
});
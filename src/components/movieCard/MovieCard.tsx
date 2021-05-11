import React from 'react';
import './movieCard.scss';

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
}

export const MovieCard = React.memo((props: MovieCardProps) => {
    const { movie } = props;
    return (
        <div className="cl-movieCard">
            <div className="cl-movieCard__header">
                {movie.title}
            </div>
        </div>)
});
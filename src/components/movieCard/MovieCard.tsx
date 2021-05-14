import React from 'react';
import './movieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faClock as faClockSolid, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons';
import { useConfig } from '../contexts/ConfigContextProvider';
import { deleteBookmarkItem, insertBookmarkItem, isBookmarkItem } from '../../api/service/Booksmark';
import { useMyList } from '../contexts/MyMoviesContextProvider';
import { useHistory } from 'react-router';

export type Movie = {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    overview: string;
    poster_path: string;
    title: string;
    vote_average: number;
}

export interface MovieCardProps {
    movie: Movie;
    isVisible: boolean;
}

export const MovieCard = React.memo((props: MovieCardProps) => {

    const { movie, isVisible } = props;

    const history = useHistory();
    const { isMovieAlreadySave, removeMovie, insertMovie } = useMyList();
    const [isBookmarked, setIsBookmarked] = React.useState(isBookmarkItem(movie.id));
    const [isInWatchLaterList, setIsInWatchLaterList] = React.useState(isMovieAlreadySave(movie.id));

    const { getGenreById } = useConfig();

    const toggleBookmarkItem = () => {
        if (isBookmarked) {
            deleteBookmarkItem(movie.id);
            setIsBookmarked(false);
        } else {
            insertBookmarkItem(movie.id);
            setIsBookmarked(true);
        }
    }

    const toggleWatchLaterListItem = () => {
        if (isInWatchLaterList) {
            removeMovie(movie);
            setIsInWatchLaterList(false);
        } else {
            insertMovie(movie);
            setIsInWatchLaterList(true);
        }
    }

    const handleRedirectToMovie = () => {
        history.push(`./movies/${movie.id}`)
    }

    return (

        <div data-testid='movie-card' className={`cl-movieCard ${isVisible ? ' cl-movieCard--open' : ' cl-movieCard--close'}`}>
            <div className="cl-movieCard__header">
                <div data-testid='movie-card-title' className='cl-movieCard__title'>
                    {movie.title}
                </div>
                <div className='cl-movieCard__categories'>
                    {movie.genre_ids.map(genreId => getGenreById && getGenreById(genreId)).join(' - ')}
                </div>
            </div>
            <div className='cl-movieCard__verticalHorizontal' />
            <div className="cl-movieCard__overview">
                <b>Overview:</b>
                <p data-testid='movie-card-overview'>
                    {movie.overview || 'There\'s nothing here, yet.'}
                </p>
            </div>
            <div className="cl-movieCard__actions">
                <span>
                    <FontAwesomeIcon color='#eb7000' icon={faStarHalfAlt} />
                    <span>{movie.vote_average} / 10</span>
                </span>

                <span onClick={toggleWatchLaterListItem}>
                    <FontAwesomeIcon
                        color='#eb7000'
                        icon={isInWatchLaterList ? faClockSolid : faClockRegular}
                        data-testid='movie-card-watch-later'
                    />
                    <span>Watch Later</span>
                </span>

                <span onClick={toggleBookmarkItem}>
                    <FontAwesomeIcon
                        color='#eb7000'
                        icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                        data-testid='movie-card-bookmark'
                    />
                    <span>Booksmark</span>
                </span>
            </div>
            <div className="cl-movieCard__watch">
                <div className="cl-movieCard__watchButton" onClick={handleRedirectToMovie}>
                    More Details
                </div>
            </div>
        </div>
    )
});
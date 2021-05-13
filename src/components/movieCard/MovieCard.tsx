import React from 'react';
import './movieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faChartPie, faClock as faClockSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faClock as faClockRegular } from '@fortawesome/free-regular-svg-icons';
import { useConfig } from '../contexts/ConfigContextProvider';
import { deleteBookmarkItem, insertBookmarkItem, isBookmarkItem } from '../../api/service/Booksmark';
import { useMyList } from '../contexts/MyMoviesContextProvider';
import { useHistory } from 'react-router';

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

    const history = useHistory();
    const { isMovieAlreadySave, removeMovie, insertMovie } = useMyList();
    const [isBookmarked, setIsBookmarked] = React.useState(isBookmarkItem(movie.id));
    const [isInWatchLaterList, setIsInWatchLaterList] = React.useState(isMovieAlreadySave(movie));

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
        <div className={`cl-movieCard${isVisible ? ' cl-movieCard--open' : ' cl-movieCard--close'}`}>
            <div className="cl-movieCard__header">
                <div className='cl-movieCard__title'>
                    {movie.title}
                </div>
                <div className='cl-movieCard__categories'>
                    {movie.genre_ids.map(genreId => getGenreById(genreId)).join(' - ')}
                </div>
            </div>
            <div className='cl-movieCard__verticalHorizontal' />
            <div className="cl-movieCard__overview">
                <b>Overview:</b>
                <p>{movie.overview || 'There\'s nothing here, yet.'}</p>
            </div>
            <div className="cl-movieCard__actions">
                <span className="cl-movieCard__userScore">
                    <FontAwesomeIcon color='#eb7000' icon={faChartPie} />
                    <span>50%</span>
                </span>
                <FontAwesomeIcon
                    className='cl-movieCard__watchLater'
                    color='#eb7000' icon={isInWatchLaterList ? faClockSolid : faClockRegular}
                    onClick={toggleWatchLaterListItem}
                />
                <FontAwesomeIcon
                    color='#eb7000'
                    icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                    onClick={toggleBookmarkItem}
                />
            </div>
            <div className="cl-movieCard__watch">
                <div className="cl-movieCard__watchButton" onClick={handleRedirectToMovie}>
                    More Details
                </div>
            </div>
        </div>)
});
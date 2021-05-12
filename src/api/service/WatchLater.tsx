import { Movie } from "../../components/movieCard/MovieCard";

const WATCH_LATER = 'watchLater';

export const insertWatchListItem = (movie: Movie) => {
    const watchLaterList: Movie[] = JSON.parse(localStorage.getItem(WATCH_LATER)) ?? [];
    localStorage.setItem(WATCH_LATER, JSON.stringify([...watchLaterList, movie]));
}

export const deleteWatchListItem = (movie: Movie) => {
    const watchLaterList: Movie[] = JSON.parse(localStorage.getItem(WATCH_LATER)) ?? [];
    localStorage.setItem(WATCH_LATER, JSON.stringify([...watchLaterList.filter(item => item.id !== movie.id)]));
}

export const isInWatchListItem = (movie: Movie) => {
    const watchLaterList: number[] = JSON.parse(localStorage.getItem(WATCH_LATER)) ?? [];
    return watchLaterList.find(item => item === movie.id) ? true : false;
}


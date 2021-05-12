import React, { useContext } from "react";
import { createContext } from "react";
import { deleteWatchListItem, fetchWatchListItem, insertWatchListItem } from "../../api/service/WatchLater";
import { Movie } from "../movieCard/MovieCard";

type MyListMovieData = {
    insertMovie: (movie: Movie) => void;
    removeMovie: (movie: Movie) => void;
    isMovieAlreadySave: (movie: Movie) => boolean;
    myMovies: Movie[];
}

type MyListMovieProps = {
    children: React.ReactNode;
}

export const MyListMovie = createContext({} as MyListMovieData);

export const MyListMovieProvider = React.memo((props: MyListMovieProps) => {

    const [myMovies, setMyMovies] = React.useState(fetchWatchListItem());

    const insertMovie = (movie: Movie) => {
        setMyMovies(oldValue => [...oldValue, movie]);
        insertWatchListItem(movie);
    }

    const removeMovie = (movie: Movie) => {
        setMyMovies(oldValue => oldValue.filter(mov => mov.id !== movie.id));
        deleteWatchListItem(movie);
    }

    const isMovieAlreadySave = (movie: Movie) => 
        myMovies.find(mov => mov.id === movie.id) ? true : false;
    

    return (
        <MyListMovie.Provider
            value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
        >
            {props.children}
        </MyListMovie.Provider>
    )
})

export const useMyList = () => useContext(MyListMovie);
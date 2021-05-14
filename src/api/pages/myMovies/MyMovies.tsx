import React from "react";
import { useMyList } from "../../../components/contexts/MyMoviesContextProvider";
import { MovieThumb } from "../../../components/movieThumb/MovieThumb";

export const MyMovies = React.memo(() => {

    const { myMovies } = useMyList();
    
    return (
        <div className="cl-content__movies">
            {!myMovies.length ? 'There\'s nothing here, yet.'
                : myMovies.map(movie => <MovieThumb key={movie.id} movie={movie} />)}
        </div>
    );
});
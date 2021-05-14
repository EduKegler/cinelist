import React from "react";
import { useSearchMovie } from "../../components/contexts/SearchContextProvider";
import { MovieThumb } from "../../components/movieThumb/MovieThumb";

export const Movies = React.memo(() => {

    const { movies, hasMore, setPage, loading, hasError } = useSearchMovie();

    const ref = React.useRef(null);
    const lastMovieElementRef = React.useCallback(
        (node) => {
            if (!loading) {
                if (ref.current) {
                    ref.current.disconnect()
                }
                ref.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPage((oldValue) => oldValue + 1);
                    }
                });
                if (node) {
                    ref.current.observe(node)
                };
            };
        },
        [loading, hasMore]
    );



    return (
        <div className="cl-content__movies">
            {hasError && <span>{hasError}</span>} 
            {movies.length > 0 && movies.map((movie, index) =>
                <div key={movie.id + '-' + index}
                    ref={movies.length === index + 1 ? lastMovieElementRef : undefined}
                >
                    <MovieThumb movie={movie} />
                </div>)}
            {loading && 'Loading...'}
            {(movies.length === 0 && !loading && !hasError) && 'No results found.'}
        </div>
    );
});
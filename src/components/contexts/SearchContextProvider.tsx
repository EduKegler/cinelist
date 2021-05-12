import React, { useContext } from "react";
import { createContext } from "react";
import { useLocation } from "react-router";
import { client } from "../../api/client";
import { useDebounce, usePrevious } from "../../helpers/util";
import { Movie } from "../movieCard/MovieCard";

type SearchMovieContextData = {
    search: string;
    setSearch: (search: string) => void;
    movies: Movie[];
}

type SearchMovieContextProps = {
    children: React.ReactNode;
}

export const SearchMovieContext = createContext({} as SearchMovieContextData);

export const SearchMovieContextProvider = React.memo((props: SearchMovieContextProps) => {

    const [search, setSearch] = React.useState('');
    const [movies, setMovies] = React.useState<Movie[]>([]);

    const searchTerm = useDebounce(search, 1000);
    const location = useLocation();

    const fetchMovies = async () => {
        try {
            const { data } = await client().get('/search/movie', { params: { query: searchTerm || 'a' } })
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }
    }

    const prevLocation = usePrevious(location);
    React.useEffect(() => { fetchMovies(); }, [searchTerm]);
    React.useEffect(() => {
        if (prevLocation?.pathname !== location?.pathname) {
            if (search) {
                setMovies([]);
            }
            setSearch('');
        }
    }, [location]);

    return (
        <SearchMovieContext.Provider
            value={{ search, setSearch, movies }}
        >
            {props.children}
        </SearchMovieContext.Provider>
    )
})

export const useSearchMovie = () => useContext(SearchMovieContext);
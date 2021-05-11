import React, { useContext } from "react";
import { createContext } from "react";
import { client } from "../../api/client";
import { useDebounce } from "../../helpers/util";
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

export function SearchMovieContextProvider(props: SearchMovieContextProps): JSX.Element {

    const [search, setSearch] = React.useState('Batman');
    const [movies, setMovies] = React.useState<Movie[]>([]);

    const searchTerm = useDebounce(search, 1000);

    async function fetchMovies() {
        try {
            const { data } = await client().get('/search/movie', { params: { query: searchTerm } })
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        fetchMovies();
    }, [searchTerm])

    return (
        <SearchMovieContext.Provider
            value={{ search, setSearch, movies }}
        >
            {props.children}
        </SearchMovieContext.Provider>
    )
}

export const useSearchMovie = () => useContext(SearchMovieContext);
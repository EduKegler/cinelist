import React, { useContext } from "react";
import { createContext } from "react";
import { useHistory, useLocation } from "react-router";
import { client } from "../../api/client";
import { useDebounce, usePrevious } from "../../helpers/util";
import { Movie } from "../movieCard/MovieCard";

type SearchMovieContextData = {
    search: string;
    loading: boolean;
    hasMore: boolean;
    setSearch: (search: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    movies: Movie[];
    handleForceSearch: () => void;
}

type SearchMovieContextProps = {
    children: React.ReactNode;
}

export const SearchMovieContext = createContext({} as SearchMovieContextData);

export const SearchMovieContextProvider = React.memo((props: SearchMovieContextProps) => {

    const [search, setSearch] = React.useState<string>();
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);

    const searchTerm = useDebounce(search, 1000);
    const location = useLocation();
    const history = useHistory();

    const fetchMovies = async () => {
        try {
            setLoading(true)
            await client().get('/search/movie', {
                params: {
                    query: searchTerm || 'a',
                    page
                }
            }).then(({ data }) => {
                setLoading(false)
                setMovies(oldValue => [...oldValue, ...data.results]);
                setHasMore(data.page !== data.total_pages);
            })
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        if (location?.pathname === '/' || searchTerm !== undefined) {
            fetchMovies();
        }
        if (searchTerm !== undefined) {
            history.push('/');
        }
    }, [page, searchTerm]);

    React.useEffect(() => {
        setMovies([]);
    }, [searchTerm]);

    const prevPage = usePrevious(page);
    const handleForceSearch = () => {
        setMovies([]);
        if (prevPage === 1) {
            fetchMovies();
        }
        setPage(1);
    };

    return (
        <SearchMovieContext.Provider
            value={{ search, setSearch, movies, loading, hasMore, setPage, handleForceSearch }}
        >
            {props.children}
        </SearchMovieContext.Provider>
    )
})

export const useSearchMovie = () => useContext(SearchMovieContext);
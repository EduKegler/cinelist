import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MoviePage } from "./Movie";
import { MyListMovie, MyListMovieProvider } from "../../components/contexts/MyMoviesContextProvider";
import { HashRouter } from "react-router-dom";

const movie = {
    backdrop_path: '',
    genres: [],
    genre_ids: [1, 2, 3],
    id: 1,
    overview: '',
    poster_path: '',
    title: 'Test Title',
    vote_average: 0,
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({ id: '1' }),
    useRouteMatch: () => ({ url: '/movies/id' }),
}));

jest.mock("./movie.service", () => ({
    fetchMovieDetails: jest.fn(() => Promise.resolve({ data: movie })),
    fetchMovieProviders: jest.fn(() => Promise.resolve({ data: { results: { US: undefined } } })),
    fetchMovieCredits: jest.fn(() => Promise.resolve({ data: { cast: [], crew: [] } })),
    fetchMovieVideos: jest.fn(() => Promise.resolve({ data: { results: [] } })),
}));

it('Check if movie exists', async () => {
    const { getByTestId } = render(
        <HashRouter>
            <MyListMovieProvider>
                <MoviePage />
            </MyListMovieProvider>
        </HashRouter>
    );

    const page = await waitFor(() => getByTestId('movie'));
    expect(page).toBeTruthy();
});

describe('Check movie content', () => {
    it('check title and overview content', async () => {
        const { getByTestId } = render(
            <HashRouter>
                <MyListMovieProvider>
                    <MoviePage />
                </MyListMovieProvider>
            </HashRouter>
        );
        const movieTitle = await waitFor(() => getByTestId('movie-title'));
        expect(movieTitle.innerHTML).toBe(movie.title);
        const movieOverview = await waitFor(() => getByTestId('movie-overview'));
        expect(movieOverview.innerHTML).toBe("There's nothing here, yet.");
    })
})

describe('Watch Later List', () => {
    it('Check if exist in watch later list', async () => {
        const isMovieAlreadySave = jest.fn()
        isMovieAlreadySave.mockReturnValue(true);
        const myMovies = [];
        const insertMovie = jest.fn()
        const removeMovie = jest.fn()

        const { getByTestId } = render(
            <HashRouter>
                <MyListMovie.Provider
                    value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
                >
                    <MoviePage ></MoviePage>
                </MyListMovie.Provider>
            </HashRouter>
        );
        const icon = await waitFor(() => getByTestId('movie-watch-later'));
        expect(icon.getAttribute('data-icon')).toBe('clock');
        expect(icon.getAttribute('data-prefix')).toBe('fas');
    })

    it('Check if not exist in watch later list', async () => {
        const isMovieAlreadySave = jest.fn()
        isMovieAlreadySave.mockReturnValue(false);
        const myMovies = [];
        const insertMovie = jest.fn()
        const removeMovie = jest.fn()

        const { getByTestId } = render(
            <HashRouter>
            <MyListMovie.Provider
                value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
            >
                <MoviePage ></MoviePage>
            </MyListMovie.Provider>
        </HashRouter>
        );
        const icon = await waitFor(() => getByTestId('movie-watch-later'));
        expect(icon.getAttribute('data-icon')).toBe('clock');
        expect(icon.getAttribute('data-prefix')).toBe('far');
    })
})

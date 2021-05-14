import React from "react";
import { render } from "@testing-library/react";
import { Movie, MovieCard } from "./MovieCard";
import { MyListMovie, MyListMovieProvider } from "../contexts/MyMoviesContextProvider";

const movie: Movie = {
    backdrop_path: '',
    genre_ids: [1, 2, 3],
    id: 1,
    overview: '',
    poster_path: '',
    title: 'Test Title',
    vote_average: 0,
}

it('Check if card exists', () => {
    const { getByTestId } = render(
        <MyListMovieProvider>
            <MovieCard isVisible={true} movie={movie}></MovieCard>
        </MyListMovieProvider>
    );
    const card = getByTestId('movie-card');
    expect(card).toBeTruthy();
});

describe('Check card content', () => {
    it('check title and overview content', () => {
        const { getByTestId } = render(
            <MyListMovieProvider>
                <MovieCard isVisible={true} movie={movie}></MovieCard>
            </MyListMovieProvider>
        );
        const cardtitle = getByTestId('movie-card-title');
        expect(cardtitle.innerHTML).toBe(movie.title);
        const cardOverview = getByTestId('movie-card-overview');
        expect(cardOverview.innerHTML).toBe("There's nothing here, yet.");
    })
})

describe('Watch Later List', () => {
    it('Check if exist in watch later list', () => {
        const isMovieAlreadySave = jest.fn()
        isMovieAlreadySave.mockReturnValue(true);
        const myMovies = [];
        const insertMovie = jest.fn()
        const removeMovie = jest.fn()

        const { getByTestId } = render(
            <MyListMovie.Provider
                value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
            >
                <MovieCard isVisible={true} movie={movie}></MovieCard>
            </MyListMovie.Provider>
        );
        const icon = getByTestId('movie-card-watch-later');
        expect(icon.getAttribute('data-icon')).toBe('clock');
        expect(icon.getAttribute('data-prefix')).toBe('fas');
    })

    it('Check if not exist in watch later list', () => {
        const isMovieAlreadySave = jest.fn()
        isMovieAlreadySave.mockReturnValue(false);
        const myMovies = [];
        const insertMovie = jest.fn()
        const removeMovie = jest.fn()

        const { getByTestId } = render(
            <MyListMovie.Provider
                value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
            >
                <MovieCard isVisible={true} movie={movie}></MovieCard>
            </MyListMovie.Provider>
        );
        const icon = getByTestId('movie-card-watch-later');
        expect(icon.getAttribute('data-icon')).toBe('clock');
        expect(icon.getAttribute('data-prefix')).toBe('far');
    })
})

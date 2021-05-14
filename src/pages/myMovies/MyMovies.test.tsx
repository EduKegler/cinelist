import React from "react";
import { render } from "@testing-library/react";
import { MyListMovie } from "../../components/contexts/MyMoviesContextProvider";
import { MyMovies } from "./MyMovies";

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
const movieList = [{ ...movie, id: 1 }, { ...movie, id: 2 }, { ...movie, id: 3 }];

    it('Check if movie exists', () => {
        const isMovieAlreadySave = jest.fn()
        const myMovies = [];
        const insertMovie = jest.fn()
        const removeMovie = jest.fn()

        const { getByTestId } = render(
            <MyListMovie.Provider
                value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
            >
                <MyMovies />
            </MyListMovie.Provider>
        );

        const page = getByTestId('my-movies');
        expect(page).toBeTruthy();
    });

describe('Check My movie list', () => {
    const isMovieAlreadySave = jest.fn()
    const myMovies = [];
    const insertMovie = jest.fn()
    const removeMovie = jest.fn()

    it('check content when list is empty', () => {
        const { getByTestId } = render(
            <MyListMovie.Provider
                value={{ myMovies, insertMovie, removeMovie, isMovieAlreadySave }}
            ><MyMovies />
            </MyListMovie.Provider>
        );
        const list = getByTestId('my-movies');
        expect(list.innerHTML).toBe("There's nothing here, yet.");
    })

    it('check content when list has items', () => {
        const { getByTestId } = render(
            <MyListMovie.Provider
                value={{ myMovies: movieList, insertMovie, removeMovie, isMovieAlreadySave }}
            ><MyMovies />
            </MyListMovie.Provider>
        );
        const list = getByTestId('my-movies');
        expect(list.children.length).toBe(movieList.length);
    })
})

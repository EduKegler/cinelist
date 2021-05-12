import React from 'react';
import { Route } from 'react-router';
import { useMyList } from '../contexts/MyMoviesContextProvider';
import { useSearchMovie } from '../contexts/SearchContextProvider';
import { MovieThumb } from '../movieThumb/MovieThumb';
import './content.scss';
import { CSSTransition } from 'react-transition-group'



export const Content = React.memo(() => {

    const { movies } = useSearchMovie();
    const { myMovies } = useMyList();

    const routes = [
        {
            path: '/', Component: () =>
                <div className="cl-content__movies">
                    {movies.map(movie => <MovieThumb key={movie.id} movie={movie} />)}
                </div>
        },
        {
            path: '/my-list', Component: () =>
                <div className="cl-content__movies page">
                    {myMovies.map(movie => <MovieThumb key={movie.id} movie={movie} />)}
                </div>
        },
        { path: '/categories', Component: () => <span>AS Soon...</span> },
    ]

    return (
        <div className="cl-content">
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                        >
                            <div className="page">
                                <Component />
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </div>)
});
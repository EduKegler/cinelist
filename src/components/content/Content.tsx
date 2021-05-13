import React from 'react';
import { Route } from 'react-router';
import { useMyList } from '../contexts/MyMoviesContextProvider';
import { MovieThumb } from '../movieThumb/MovieThumb';
import './content.scss';
import { CSSTransition } from 'react-transition-group'
import { Movies } from '../../api/pages/movies/Movies';
import { MoviePage } from '../../api/pages/movie/Movie';

export const Content = React.memo(() => {

    const { myMovies } = useMyList();

    const routes = [
        { path: '/', Component: () => <Movies /> },
        {
            path: '/my-list', Component: () =>
                <div className="cl-content__movies">
                    {!myMovies.length ? 'There\'s nothing here, yet.'
                        : myMovies.map(movie => <MovieThumb key={movie.id} movie={movie} />)}
                </div>
        },
        { path: '/movies/:id', Component: () => <MoviePage /> },
        { path: '/categories', Component: () => <span>Coming soon...</span> },
    ];

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
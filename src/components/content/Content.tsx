import React from 'react';
import { Route } from 'react-router';
import './content.scss';
import { CSSTransition } from 'react-transition-group'
import { Movies } from '../../pages/movies/Movies';
import { MoviePage } from '../../pages/movie/Movie';
import { MyMovies } from '../../pages/myMovies/MyMovies';

export const Content = React.memo(() => {

    const routes = [
        { path: '/', Component: () => <Movies /> },
        { path: '/my-list', Component: () => <MyMovies /> },
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
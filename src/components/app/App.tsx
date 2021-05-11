import React from 'react';
import { Content } from '../content/Content';
import { SearchMovieContextProvider } from '../contexts/SearchContextProvider';
import { Header } from '../header/Header';
import { Sider } from '../sider/Sider';
import './app.scss';

export const App = React.memo(() => {
    return (
        <div className="cl-app">
            <SearchMovieContextProvider>
                <Header />
                <div className="cl-app__content">
                    <Sider />
                    <Content />
                </div>
            </SearchMovieContextProvider>
        </div>
    )
});
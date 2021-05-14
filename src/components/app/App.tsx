import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Content } from '../content/Content';
import { ConfigContextProvider } from '../contexts/ConfigContextProvider';
import { MyListMovieProvider } from '../contexts/MyMoviesContextProvider';
import { SearchMovieContextProvider } from '../contexts/SearchContextProvider';
import { Header } from '../header/Header';
import { Sider } from '../sider/Sider';
import './app.scss';

export const App = React.memo(() => {
    return (
        <div className="cl-app">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <MyListMovieProvider>
                    <SearchMovieContextProvider>
                        <ConfigContextProvider>
                            <Header />
                            <div className="cl-app__content">
                                <Sider />
                                <Content />
                            </div>
                        </ConfigContextProvider>
                    </SearchMovieContextProvider>
                </MyListMovieProvider>
            </BrowserRouter>
        </div>
    )
});
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Content } from '../content/Content';
import { ConfigContextProvider } from '../contexts/ConfigContextProvider';
import { MyListMovieProvider } from '../contexts/MyMoviesContextProvider';
import { SearchMovieContextProvider } from '../contexts/SearchContextProvider';
import { Header } from '../header/Header';
import { Sider } from '../sider/Sider';
import './app.scss';

export const App = React.memo(() => {
    console.log(process.env.PUBLIC_URL)
    return (
        <div className="cl-app">
            <HashRouter>
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
            </HashRouter>
        </div>
    )
});
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './header.scss';
import { useSearchMovie } from '../contexts/SearchContextProvider';
import { Link } from 'react-router-dom';
import logoWhite from './../../assets/images/logo_white.png';

export const Header = React.memo(() => {

    const { setSearch, search, setPage } = useSearchMovie();

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        setPage(1)
    };

    const Menu = () => <div className='cl-header__menu'>
        <Link to='/'>Search</Link>
        <Link to='/my-list'>My List</Link>
        <Link to='/categories'>Categories</Link>
    </div>;

    const Logo = () => <img src={logoWhite} alt='logo' />

    return (
        <header className="cl-header">
            <div className="cl-header__desktop">
                <Logo />
                <div className="cl-header__search">
                    <input
                        value={search}
                        placeholder="I'm looking for..."
                        onChange={handleChangeSearch}
                    />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="cl-header__mobile">
                <div className="cl-header__mobile-menu">
                    <Logo />
                    <Menu />
                </div>

                <div className="cl-header__search">
                    <input
                        value={search}
                        placeholder="I'm looking for..."
                        onChange={handleChangeSearch}
                    />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </header>
    )
});
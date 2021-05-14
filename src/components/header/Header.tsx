import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './header.scss';
import { useSearchMovie } from '../contexts/SearchContextProvider';
import { Link, useLocation } from 'react-router-dom';
import logoWhite from './../../assets/images/logo_white.png';

export const Header = React.memo(() => {

    const { setSearch, search, setPage, handleForceSearch } = useSearchMovie();

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        setPage(1)
    };

    const location = useLocation();
    const isActive = (key: string) => location.pathname === key ? 'cl-sider__item-active' : '';

    const Menu = () => <div className='cl-header__menu'>
        <Link className={isActive('/')} to='/'>Search</Link>
        <Link className={isActive('/my-list')} to='/my-list'>My List</Link>
    </div>;

    const Logo = () => <Link to='/'><img src={logoWhite} alt='logo' /></Link>

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
                    <FontAwesomeIcon onClick={handleForceSearch} icon={faSearch} />
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
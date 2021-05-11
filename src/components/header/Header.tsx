import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import './header.scss';
import { useSearchMovie } from '../contexts/SearchContextProvider';

export const Header = React.memo(() => {
    
    const { setSearch, search } = useSearchMovie();

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    };

    return (
        <header className="cl-header">
            <div>CineList</div>
            <div className="cl-header__search">
                <input
                    value={search}
                    placeholder="I'm looking for..."
                    onChange={handleChangeSearch} />
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="cl-header__extra">Other Options</div>
        </header>
    )
});
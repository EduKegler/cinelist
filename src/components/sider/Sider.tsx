import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sider.scss';

export const Sider = React.memo(() => {

    const location = useLocation();
    const isActive = (key: string) => location.pathname === key ? 'cl-sider__item-active' : '';
    
    return (
        <div className="cl-sider">
            <div className="cl-sider__menu">
            <Link className={isActive('/')} to='/'>Search</Link>
            <Link className={isActive('/my-list')} to='/my-list'>My List</Link>
            <Link className={isActive('/categories')} to='/categories'>Categories</Link>
            </div>
        </div>
    )
});
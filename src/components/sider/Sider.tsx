import React from 'react';
import { Link } from 'react-router-dom';
import './sider.scss';

export const Sider = React.memo(() => {
    return (
        <div className="cl-sider">
            <div className="cl-sider__menu">
            <Link className='active' to='./'>Search</Link>
            <Link to='./my-list'>My List</Link>
            <Link to='./categories'>Categories</Link>
            </div>
        </div>
    )
});
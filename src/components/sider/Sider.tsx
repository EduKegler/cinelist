import React from 'react';
import './sider.scss';

export const Sider = React.memo(() => {
    return (
        <div className="cl-sider">
            <ul>
                <li>Search</li>
                <li>My List</li>
                <li>Category</li>
                <li>Others</li>
            </ul>
        </div>
    )
});
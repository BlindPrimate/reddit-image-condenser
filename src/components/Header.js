import React from 'react';
import './Header.scss';


export default (props) => {
    return (
        <div className="header">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}
import React from 'react';

export default (props) => {
    const renderList = (arr) => {
        return arr.map((item) => {
            return (
                <li className="dropdown-item">
                    {item}
                </li>
            )
        });
    }
    return (
        <ul className="dropdown">
            {renderList(props.items)}
        </ul>
    )
}
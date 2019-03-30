import React from 'react';
import './TagCloud.scss';

const renderItems = (items) => {
    return items.map((item) => {
        return (
            <li key={item}>
                {item}
            </li>
        )
    });
}

export default (props) => {
    return (
        <ul className="cloud-bin">
            renderItems(props.items);
        </ul>
    )
}




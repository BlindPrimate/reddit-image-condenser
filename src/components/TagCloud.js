import React from 'react';
import './TagCloud.scss';

const renderItems = (items, callback) => {
    return items.map((item) => {
        return (
            <li key={item}>
                {item}
                <i className="far fa-times-circle" onClick={() => callback(item)}></i>
            </li>
        )
    });
}

export default (props) => {
    if (props.items.length) {
        return (
            <ul className="cloud-bin">
                {renderItems(props.items, props.callback)}
            </ul>
        )
    }
    return <div></div>
}




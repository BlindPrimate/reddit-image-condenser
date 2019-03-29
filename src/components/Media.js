import React from 'react';
import './Media.scss';

class Media extends React.Component {
    render () {
        return (
            <img src={this.props.src} alt={this.props.alt} />
        )
    }
}

export default Media;
import React from 'react';
import './Media.scss';

class Media extends React.Component {
    render () {
        return (
            <div className="media-wrapper">
                <img src={this.props.src} alt={this.props.alt} />
            </div>
        )
    }
}

export default Media;
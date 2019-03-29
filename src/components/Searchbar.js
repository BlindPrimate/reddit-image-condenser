import React from 'react';
import './Searchbar.scss';

class Searchbar extends React.Component {
    render () {
        return (
            <div id="searchbar"><input placeholder="search subreddits" type="text"/></div>
        )
    }
}

export default Searchbar;
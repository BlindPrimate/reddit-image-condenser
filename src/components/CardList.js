import React from 'react';
import Media from './Media';
import './CardList.scss';

class CardList extends React.Component {
    renderCards() {
        return this.props.posts.map((post) => {
            return (
                <li key={post.title} className="card">
                    <h3>
                        <a href={`https://www.reddit.com/${post.permalink}`}>{post.title}</a>
                    </h3>
                    <Media src={post.url} alt={post.title} />
                </li>
            )
        });
    }
    render () {
        return (
            <ul className="card-list">
                {this.renderCards()}
            </ul>
        )
    }
}

export default CardList;
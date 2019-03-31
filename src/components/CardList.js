import React from 'react';
import Media from './Media';
import './CardList.scss';

class CardList extends React.Component {
    renderCards() {
        if (!this.props.posts.length) {
            return <div className="no-content">Add a subreddit to see your images...</div>
        }
        return this.props.posts.map((post) => {
            return (
                <div className="container">
                    <li key={post.title} className="card">
                        <h3>
                            <a href={`https://www.reddit.com/${post.permalink}`}>{post.title}</a>
                        </h3>
                        <p>{post.ups}</p>
                        <p>{post.subreddit}</p>
                        <Media src={post.url} alt={post.title} />
                    </li>
                </div>
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
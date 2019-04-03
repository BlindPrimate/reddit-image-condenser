import React from 'react';
import Media from './Media';
import './CardList.scss';

class CardList extends React.Component {
    renderCards() {
        return this.props.posts.map((post) => {
            return (
                <li key={post.id} className="card">
                    <Media src={post.url} alt={post.title} />
                    <div className="card-info">
                        <h4>
                            <a href={`https://www.reddit.com/${post.permalink}`}>{post.title}</a>
                        </h4>
                        <div className="details-left">
                            <p>{post.subreddit_name_prefixed}</p>
                        </div>
                        <div className="details-right">
                            <p>{post.ups}</p>
                        </div>
                    </div>
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

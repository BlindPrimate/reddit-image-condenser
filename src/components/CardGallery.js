import React from 'react';
import Media from './Media';
import './CardGallery.scss';

// import upvote from '../images/upvote.png';

class CardGallery extends React.Component {
    renderCards() {
        return this.props.posts.map((post) => {
            return (
                <li key={post.id} className="card">
                    <div className="card-info">
                        <h4>
                            <a href={`https://www.reddit.com/${post.permalink}`}>{post.title}</a>
                        </h4>
                        <div className="details-left">
                            <p>{post.subreddit_name_prefixed}</p>
                        </div>
                        <div className="details-right">
                            <p className="comments">
                                <a href={`https://www.reddit.com/${post.permalink}`}>
                                    <i class="far fa-comment"></i>
                                    {`${post.num_comments} comments`} 
                                </a>
                            </p>
                            <p className="upvotes"><img src={upvote} alt="Upvote Arrow"/>{post.ups}</p>
                        </div>
                    </div>
                    <Media src={post.url} alt={post.title} />
                </li>
            )
        });
    }
    render () {
        return (
            <ul className="card-gallery">
                {this.renderCards()}
            </ul>
        )
    }
}

export default CardGallery;

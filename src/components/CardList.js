import React from 'react';

class CardList extends React.Component {
    renderCards() {
        console.log(this.props.posts)
        return this.props.posts.map((post) => {
            return (
                <li>
                    <h3>{post.title}</h3>
                    <div>{post.permalink}</div>
                </li>
            )
        });
    }
    render () {
        return (
            <ul>
                {this.renderCards()}
            </ul>
        )
    }
}

export default CardList;
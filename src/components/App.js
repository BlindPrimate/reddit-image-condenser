import React from 'react';
import { connect } from 'react-redux';

import './App.scss';

import CardList from './CardList';
import Searchbar from './Searchbar';
import Header from './Header';
import Loader from './common/Loader';
import TagCloud from './TagCloud';


import { addSubreddit, removeSubreddit } from '../actions';
import { createLoadingSelector } from '../selectors/loadingSelector';
import { createErrorSelector } from '../selectors/errorSelector';

class App extends React.Component {

    componentDidMount() {
        this.props.addSubreddit('pics');
        this.props.addSubreddit('ladyladyboners');
    }

    renderCardList() {
        if (this.props.isFetching) {
            return <Loader />
        } else if (!this.props.posts.length) {
            return <div className="no-content">Add a subreddit to see your images...</div>
        } else {
            return <CardList posts={this.props.posts} />
        }
    }
    render() {
        return (
            <div id="app">
                <Header>
                    <Searchbar />
                </Header>
                <div className="container">
                    <TagCloud items={this.props.subreddits} callback={this.props.removeSubreddit} />
                    {this.renderCardList()}
                </div>
            </div>
        )
    }
}

// loading selector to check on isFetching status of action type
const loadingSelector = createLoadingSelector(['FETCH_POSTS']);
const errorSelector = createErrorSelector(['FETCH_POSTS']);

const mapStateToProps = (state) => {
    const { posts } = state;
    const { subreddits } = state;
    return {
        posts,
        subreddits,
        isFetching: loadingSelector(state),
        error: errorSelector(state)
    }
}


export default connect(mapStateToProps, { addSubreddit, removeSubreddit })(App);

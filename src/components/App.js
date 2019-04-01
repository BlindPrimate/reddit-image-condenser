import React from 'react';
import { connect } from 'react-redux';

import CardList from './CardList';
import Searchbar from './Searchbar';
import Header from './Header';
import Loader from './common/Loader';
import { addSubreddit } from '../actions';
import './App.scss';

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
                {this.renderCardList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { data, isFetching } = state.posts;
    return {
        posts: data,
        isFetching
    }
}


export default connect(mapStateToProps, { addSubreddit })(App);

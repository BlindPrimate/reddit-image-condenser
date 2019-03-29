import React from 'react';
import { connect } from 'react-redux';

import CardList from './CardList'
import Searchbar from './Searchbar'
import { fetchPosts } from '../actions';
import './App.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        return (
            <div>
                <Searchbar />
                <CardList posts={this.props.posts} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}


export default connect(mapStateToProps, { fetchPosts })(App);
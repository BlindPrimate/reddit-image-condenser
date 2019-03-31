import React from 'react';
import { connect } from 'react-redux';

import CardList from './CardList'
import Searchbar from './Searchbar'
import Header from './Header'
import { addSubreddit } from '../actions';
import './App.scss';

class App extends React.Component {
    componentDidMount() {
        this.props.addSubreddit('pics');
        this.props.addSubreddit('ladyladyboners');

    }
    render() {
        return (
            <div>
                <Header>
                    <Searchbar />
                </Header>
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


export default connect(mapStateToProps, { addSubreddit })(App);
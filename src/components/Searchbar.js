import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';
import { fetchPosts, searchSubs, addSubreddit, removeSubreddit } from '../actions';
import TagCloud from './TagCloud';
import Loader from './common/Loader';
import { createLoadingSelector } from '../selectors/loadingSelector';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown_open: false,
        }
    }
    onFormChange = debounce((values) => {
        const target = values.currentTarget.defaultValue;
        this.props.searchSubs(target);
    }, 500);

    onOptionClick(subreddit) {
        this.props.addSubreddit(subreddit);
    }

    toggleDropdown() {
        this.setState({dropdown_open: !this.state.dropdown_open});
    }

    renderSearchResults() {
        if (this.props.search_results) {
            return this.props.search_results.map((option) => {
                return (
                    <li 
                        onClick={() => this.onOptionClick(option.display_name)} 
                        key={option.name}
                    >
                        {option.display_name}
                    </li>
                )
            })
        }
    }

    renderSpinner() {
        if (this.props.isFetching) {
            return <Loader />
        }
    }

    render () {
        return (
            <div className="searchbar">
                <form>
                    <span>/r/</span>
                    <Field 
                        name="search_term" 
                        placeholder="Subreddit" 
                        component="input" 
                        type="text" 
                        onChange={this.onFormChange}
                    />
                </form>
                <TagCloud items={this.props.subreddits} callback={this.props.removeSubreddit} />
                <div className={`search-results-wrapper ${this.props.dirty && this.state.dropdown_open ? 'show' : ''}`}>
                    <ul className="search-results">
                        {this.renderSearchResults()}
                    </ul>
                </div>
            </div>
        )
    }
}


const loadingSelector = createLoadingSelector(['SEARCH_SUBS']);

const mapStateToProps = (state) => {
    const { search_results, error } = state.search;
    const { subreddits } = state;
    return {
        search_results,
        subreddits,
        isFetching: loadingSelector(state),
        error
    }
}


const search = connect(mapStateToProps, { fetchPosts, searchSubs, addSubreddit, removeSubreddit })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



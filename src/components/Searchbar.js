import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';
import { fetchPosts, searchSubs, addSubreddit } from '../actions';
import Loader from './common/Loader';
import { createLoadingSelector } from '../selectors/loadingSelector';
import { createErrorSelector } from '../selectors/errorSelector';

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
        if (this.props.errors === null) {
            return <div>No Results</div>
        } else if (this.props.errors) {
            return <div>Oops!  We were unable to complete your search. Please try again.</div>
        } else if (this.props.isFetching) {
            return <Loader text="Loading" />
        } else if (this.props.search_results.length) {
            return this.props.search_results.map((option) => {
                return (
                    <li 
                        onClick={() => this.onOptionClick(option.display_name)} 
                        key={option.name}
                    >
                        {option.display_name}
                    </li>
                )
            });
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
const errorSelector = createErrorSelector(['SEARCH_SUBS']);

const mapStateToProps = (state) => {
    const { search_results } = state;
    return {
        search_results,
        isFetching: loadingSelector(state),
        errors: errorSelector(state)
    }
}


const search = connect(mapStateToProps, { fetchPosts, searchSubs, addSubreddit })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



import React from 'react';
import { connect } from 'react-redux';

import './SearchResults.scss';

import Loader from './common/Loader';

import { addSubreddit } from '../actions';
import { createLoadingSelector } from '../selectors/loadingSelector';
import { createErrorSelector } from '../selectors/errorSelector';

class SearchResults extends React.Component {

    onOptionClick(subreddit) {
        this.props.addSubreddit(subreddit);
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
            <ul className={`search-results ${this.props.search_results.length ? 'open' : '' }`}>
                {this.renderSearchResults()}
            </ul>
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


export default connect(mapStateToProps, { addSubreddit })(SearchResults); 



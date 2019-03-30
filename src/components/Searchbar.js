import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';
import { searchSubs, addSubreddit } from '../actions';
import TagCloud from './TagCloud';

class Searchbar extends React.Component {
    onFormChange = debounce((values) => {
        const target = values.currentTarget.defaultValue;
        this.props.searchSubs(target);
    }, 500);

    onOptionClick(subreddit) {
        this.props.addSubreddit(subreddit);
    }

    renderSearchOptions() {
        if (this.props.search_options) {
            return this.props.search_options.map((option) => {
                return (
                    <li onClick={() => this.onOptionClick(option.display_name)} key={option.name}>{option.display_name}</li>
                )
            })
        }
    }

    renderTagCloud() {
        if (this.props.subreddits) {
            return this.props.subreddits.map((subreddit) => {
                return (
                    <li>{subreddit}</li>
                )
            });
        }
    }

    render () {
        console.log(this.props);
        return (
            <div className="searchbar">
                <form>
                    <Field 
                        name="search_term" 
                        placeholder="Add Subreddt" 
                        component="input" 
                        type="text" 
                        onChange={this.onFormChange}
                    />
                </form>
                <ul className="cloud-bin">
                    {this.renderTagCloud()}
                </ul>
                <div className={`search-options-wrapper ${this.props.dirty ? 'open' : ''}`}>
                    <ul className="search-options">
                        {this.renderSearchOptions()}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        search_options: state.search.search_options,
        subreddits: state.search.subreddits
    }
}


const search = connect(mapStateToProps, { searchSubs, addSubreddit })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



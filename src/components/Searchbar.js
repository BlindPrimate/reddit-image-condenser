import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';
import { fetchPosts, searchSubs, addSubreddit, removeSubreddit } from '../actions';
import TagCloud from './TagCloud';
import Dropdown from './Dropdown';

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

    renderSearchOptions() {
        if (this.props.search_options) {
            return this.props.search_options.map((option) => {
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
                <div className={`search-options-wrapper ${this.props.dirty && this.state.dropdown_open ? 'show' : ''}`}>
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


const search = connect(mapStateToProps, { fetchPosts, searchSubs, addSubreddit, removeSubreddit })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



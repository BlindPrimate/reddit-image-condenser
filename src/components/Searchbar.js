import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';
import { searchSubs } from '../actions';

class Searchbar extends React.Component {
    onFormChange = debounce((values) => {
        const target = values.currentTarget.defaultValue;
        this.props.searchSubs(target);
    }, 700);

    renderSearchOptions() {
        return this.props.search_options.map((option) => {
            return (
                <li key={option.name}>{option.display_name}</li>
            )
        })

    }

    render () {
        // console.log(this.props);
        return (
            <div className="searchbar">
                <form>
                    <div>{this.props.search_term}</div>
                    <Field 
                        name="search_term" 
                        placeholder="Add Subreddt" 
                        component="input" 
                        type="text" 
                        onChange={this.onFormChange}
                    />
                </form>
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
        search_options: state.search_options
    }
}


const search = connect(mapStateToProps, { searchSubs })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



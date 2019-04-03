import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import './Searchbar.scss';

import { fetchPosts, searchSubs, addSubreddit } from '../actions';

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
            </div>
        )
    }
}


const search = connect(null, { fetchPosts, searchSubs, addSubreddit })(Searchbar); 
export default reduxForm({ form: 'subreddits' })(search);



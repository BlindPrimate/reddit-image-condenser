import React from 'react';
import './Loader.scss';


export default (props) => {
      return (
        <div className="spinner">
          <i className="fas fa-circle-notch"></i>
          <span>
            {(props.text) ? props.text : ''}
          </span>
        </div>
      )
}

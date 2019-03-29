import axios from 'axios';

import auth from '../auth';


export default axios.create({
    baseURL: `${'https://cors-anywhere.herokuapp.com/'}https://www.reddit.com/`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    crossDomain: true,
    params: {
        client_id: auth.client_id,
        client_secret: auth.client_secret,
    }

});
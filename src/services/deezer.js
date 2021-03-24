import axios from 'axios';
import _ from 'lodash';
import settings from '../config/settings';

export const deezerService = _.throttle((query, endpoint, callback) => {
  axios.get(endpoint(query))
    .then(response => {
      callback(response.data.data);
        // console.log(response.data.data);
    })
    .catch(error => console.log(error));
  }, settings.DEBOUNCE_TIME);

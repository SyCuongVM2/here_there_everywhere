// import axios from 'axios';
import client from './client';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    client.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete client.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
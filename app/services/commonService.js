import axios from 'axios';

export const onAuthenticate = payload => {
  const URL = 'https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10';
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const onAuthenticate2 = payload => {
  const URL = 'https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10';
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // whatever you want
    },
    data: payload,
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
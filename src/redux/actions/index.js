import axios from 'axios';

function determine(type, data) {
  return {
    type,
    data
  }
}

function fetch(type, url) { 
  return dispatch =>
  axios.get(url)
  .then(response => {    
    dispatch(determine(type, response.data));
  })
  .catch(e => {
    return;
  })
}

function fetchQuery(type, url, options) { 
  return dispatch =>
  axios.post(url,options)
  .then(response => {    
    dispatch(determine(type, response.data));
  })
  .catch(e => {
    return;
  })
}

export {
  fetch,
  fetchQuery,
  determine,
}
export * from './api-url';
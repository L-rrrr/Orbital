import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiRequest.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiRequest.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default apiRequest;

// import axios from 'axios';

// const apiRequest = axios.create({
//   baseURL: 'http://localhost:5000/api', // Your actual API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiRequest.interceptors.request.use((config) => {
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// apiRequest.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });

// export default apiRequest;


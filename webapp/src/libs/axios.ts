import axios from 'axios';

function apiInstance(baseUrl: string) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-type': 'application/json',
    },
  });
  return instance;
}
export { apiInstance };

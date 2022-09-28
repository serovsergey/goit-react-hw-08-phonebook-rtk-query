const { default: axios } = require("axios");

const apiClient = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  // withCredentials: true,
  // params: { }
})

export const setToken = token => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearToken = () => {
  apiClient.defaults.headers.common.Authorization = ``;
}

export default apiClient;

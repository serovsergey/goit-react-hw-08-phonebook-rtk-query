import apiClient from "./apiClient";

export const register = async credentials => {
  const { data } = await apiClient.post('/users/signup', credentials);
  return data;
}

export const login = async credentials => {
  const { data } = await apiClient.post('/users/login', credentials);
  return data;
}

export const logout = async () => {
  const { data } = await apiClient.post('/users/logout');
  return data;
}

export const getCurrentUser = async () => {
  const { data } = await apiClient.get('/users/current');
  return data;
}

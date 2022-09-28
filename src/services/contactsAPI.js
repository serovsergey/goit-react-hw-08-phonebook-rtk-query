import apiClient from "./apiClient";

export const fetchAllContacts = async () => {
  const { data } = await apiClient.get('/contacts');
  return data;
}

export const addContact = async item => {
  const { data } = await apiClient.post('/contacts', item);
  return data;
}

export const deleteContact = async (id) => {
  const { data } = await apiClient.delete(`/contacts/${id}`);
  return data;
}

export const editContact = async ({ id, name, number }) => {
  const { data } = await apiClient.patch(`/contacts/${id}`, { name, number });
  return data;
}

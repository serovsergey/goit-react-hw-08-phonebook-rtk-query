import axios from "axios";

const instance = axios.create({
  baseURL: 'https://632dcf28519d17fb53c6f0c5.mockapi.io/contacts',
  params: {
  }
})

export const fetchAllContacts = async () => {
  const { data } = await instance.get('');
  return data;
}

export const addContact = async (item) => {
  const { data } = await instance.post('', item);
  return data;
}

export const deleteContact = async (id) => {
  const { data } = await instance.delete(`${id}`);
  return data;
}

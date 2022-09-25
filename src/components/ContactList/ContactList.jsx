import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { getContacts } from 'redux/contactsSlice/selector.contacts';
import { getFilter } from 'redux/filterReducer/selector.filter';
import { deleteContact, fetchAllContacts } from 'redux/contactsSlice/operations.contacts';

export const ContactList = () => {
  const { items, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDeleteItem = (id) => {
    if (!isLoading) {
      dispatch(deleteContact(id));
    }
  }

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch])

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter(record => record.name.toLowerCase().includes(normalizedFilter))
  }, [items, filter]);

  return (
    <>
      <ul className={s.list}>
        {filteredContacts.map(({ id, name, phone }) => (
          <li key={id} className={s.item}>
            <span>{name}: {phone}</span>
            <button onClick={() => handleDeleteItem(id)}>✖</button>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  )
}

// ContactList.propTypes = {}

export default ContactList

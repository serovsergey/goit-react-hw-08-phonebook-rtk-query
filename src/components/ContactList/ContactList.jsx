import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { getContactsError, getContactsIsLoading, getContactsItems } from 'redux/contactsSlice/selector.contacts';
import { getFilter } from 'redux/filterReducer/selector.filter';
import { fetchAllContacts } from 'redux/contactsSlice/operations.contacts';
import ContactForm from 'components/ContactForm';
import ContactItem from 'components/ContactItem';
import { LinearProgress } from '@mui/material';

export const ContactList = () => {
  const items = useSelector(getContactsItems);
  const isLoading = useSelector(getContactsIsLoading);
  const error = useSelector(getContactsError);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch])

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter(record => record.name.toLowerCase().includes(normalizedFilter))
  }, [items, filter]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <div className={s.list}>
        {filteredContacts.map(({ id, name, number }) => (
          <ContactItem key={id} id={id} name={name} number={number} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

    </>
  )
}

// ContactList.propTypes = {}

export default ContactList

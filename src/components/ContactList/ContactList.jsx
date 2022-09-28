import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { getContactsError, getContactsIsLoading, getContactsItems } from 'redux/contactsSlice/selector.contacts';
import { getFilter } from 'redux/filterReducer/selector.filter';
import { fetchAllContacts } from 'redux/contactsSlice/operations.contacts';
import ContactItem from 'components/ContactItem';
import { Box, LinearProgress, Typography } from '@mui/material';

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
    // return items.filter(record => record.name.toLowerCase().includes(normalizedFilter))
    return [...items]
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((acc, item) => {
        if (!item.name.toLowerCase().includes(normalizedFilter)) {
          return acc;
        }
        else {
          const firstLetter = item.name[0].toUpperCase();
          return { ...acc, [firstLetter]: (acc[firstLetter] ? [...acc[firstLetter], item] : [item]) }
        }
      }, {});
  }, [items, filter]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Box sx={{
        columnWidth: "16em",
      }}>
        <div className={s.list}>
          {Object.keys(filteredContacts).map(letter => (
            <Box key={letter} sx={{ breakInside: "avoid-column" }}>
              <Typography variant='h5'> {letter}</Typography>
              {
                filteredContacts[letter].map(({ id, name, number }) => (
                  <ContactItem key={id} id={id} name={name} number={number} />
                ))
              }
            </Box>
          ))}
        </div >
        {!isLoading && error && <p>{error}</p>}
      </Box >
    </>
  )
}

// ContactList.propTypes = {}

export default ContactList

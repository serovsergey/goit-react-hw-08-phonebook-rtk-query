import { useMemo } from 'react';
import { useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { getFilter } from 'redux/filterReducer/selector.filter';
import ContactItem from 'components/ContactItem';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useGetContactsQuery } from 'services/contacts.api';

export const ContactList = () => {
  const query = useGetContactsQuery();
  const { data: items = [], isFetching, error } = query;
  const filter = useSelector(getFilter);

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
      {isFetching && <LinearProgress />}
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
        {!isFetching && error && <p>{error.message}</p>}
      </Box >
    </>
  )
}

// ContactList.propTypes = {}

export default ContactList

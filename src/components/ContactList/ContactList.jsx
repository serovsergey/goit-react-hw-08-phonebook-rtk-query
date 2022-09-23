import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { deleteItemAction } from '../../redux/itemsSlice/slice.items';
import { getItems } from 'redux/itemsSlice/selector.items';
import { getFilter } from 'redux/filterReducer/selector.filter';

export const ContactList = () => {
  const contacts = useSelector(getItems);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(deleteItemAction(id));
  }

  // useEffect(() => {
  //   dispatch(readItemsFromStorage());
  // }, [dispatch])

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(record => record.name.toLowerCase().includes(normalizedFilter))
  }, [contacts, filter]);

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <span>{name}: {number}</span>
          <button onClick={() => handleDeleteItem(id)}>✖</button>
        </li>
      ))}
    </ul>
  )
}

// ContactList.propTypes = {}

export default ContactList

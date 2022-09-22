import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import s from './ContactList.module.scss'
import { deleteItem, getItems } from '../../redux/itemsSlice/slice.items';

export const ContactList = () => {
  const contacts = useSelector(getItems);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
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

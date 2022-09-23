import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemAction, getItems } from 'redux/itemsSlice/slice.items';
// import PropTypes from 'prop-types'
import s from './ContactForm.module.scss'

export const ContactForm = () => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const formFields = { name: setName, number: setNumber };
  const contacts = useSelector(getItems);
  const dispatch = useDispatch();
  const onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    formFields[name](value);
  }

  const onSubmitForm = evt => {
    evt.preventDefault();
    const searchingName = name.toLowerCase();
    if (contacts.some(item => item.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addItemAction({ name, number }));
    Object.values(formFields).forEach(setField => setField(''));
  }

  return (
    <form className={s.form} onSubmit={onSubmitForm}>
      <label>Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInputChange}
        />
      </label>
      <label>Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onInputChange}
        />
      </label>
      <button type='submit'>Add contact</button>
    </form>
  )
}

// ContactForm.propTypes = {}

export default ContactForm

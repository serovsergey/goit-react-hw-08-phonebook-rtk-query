import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ContactList from 'components/ContactList';
import { Button } from '@mui/material';
import Modal from '../../components/shared/Modal';
import ContactForm from 'components/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsItems } from 'redux/contactsSlice/selector.contacts';
import { addContact } from 'redux/contactsSlice/operations.contacts';

// import s from './Contacts.module.scss';

const Contacts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = useSelector(getContactsItems);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  }

  const handleSubmit = ({ name, number }) => {
    const searchingName = name.toLowerCase();
    if (items.some(item => item.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button onClick={toggleModal}>Add contact</Button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={handleSubmit} />
        </Modal>
      )}
      <ContactList />
    </div>
  )
};

// Contacts.propTypes = {};

export default Contacts;

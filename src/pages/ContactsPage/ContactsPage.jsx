import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ContactList from 'components/ContactList';
import { Button, Paper } from '@mui/material';
import Modal from '../../components/shared/Modal';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import { useAddContactMutation, useGetContactsQuery } from 'services/contacts.api';

// import s from './contactsPage.module.scss';

const ContactsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addContact] = useAddContactMutation();
  const { data: items } = useGetContactsQuery();

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  }

  const handleSubmit = ({ name, number }) => {
    const searchingName = name.toLowerCase();
    if (items.some(item => item.name.toLowerCase() === searchingName)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    addContact({ name, number });
    setIsModalOpen(false);
  }

  return (
    <>
      <Button sx={{ display: 'block', marginLeft: 'auto' }} onClick={toggleModal}>Add contact</Button>
      <Filter />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={handleSubmit} onClose={toggleModal} />
        </Modal>
      )}
      <Paper elevation={0} sx={{ marginTop: 1 }}>
        <ContactList />
      </Paper>
    </>
  )
};

// ContactsPage.propTypes = {};

export default ContactsPage;

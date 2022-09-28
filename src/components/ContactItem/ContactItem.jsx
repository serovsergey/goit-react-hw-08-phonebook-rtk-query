import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/contactsSlice/operations.contacts';
import ContactForm from 'components/ContactForm';
import Modal from '../../components/shared/Modal';

// import s from './contactItem.module.scss';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteItem = () => {
    dispatch(deleteContact(id));
  }

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  }

  const handleSubmit = (item) => {
    dispatch(editContact({ ...item, id }));
    setIsModalOpen(false);
  }

  return (
    <>
      <Card>
        <span>{name}: {number}</span>
        <Button onClick={handleDeleteItem}>✖</Button>
        <Button onClick={toggleModal}>Edit</Button>
      </Card >
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={handleSubmit} initialData={{ name, number }} />
        </Modal>
      )}
    </>
  )
};

ContactItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;

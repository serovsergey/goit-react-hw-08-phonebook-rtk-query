import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from 'redux/contactsSlice/operations.contacts';
import ContactForm from 'components/ContactForm';
import Modal from '../../components/shared/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import s from './contactItem.module.scss';

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
      <Card sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,
        padding: 1,
      }}>
        <div>
          <div className={s.name}>{name}</div>
          <div className={s.number}>{number}</div>
        </div>
        <div>
          <IconButton onClick={toggleModal} aria-label="edit"><EditIcon /></IconButton >
          <IconButton onClick={handleDeleteItem} aria-label="delete"><DeleteForeverIcon /></IconButton >
        </div>
      </Card >
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={handleSubmit} initialData={{ name, number }} onClose={toggleModal} />
        </Modal>
      )}
    </>
  )
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;

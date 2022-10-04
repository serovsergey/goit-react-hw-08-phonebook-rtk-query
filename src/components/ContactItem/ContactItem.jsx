import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CircularProgress, IconButton } from '@mui/material';
import ContactForm from 'components/ContactForm';
import Modal from '../../components/shared/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import s from './contactItem.module.scss';
import { useDeleteContactMutation, useGetContactsQuery, useUpdateContactMutation } from 'services/contacts.api';

const ContactItem = ({ id, name, number }) => {
  const { isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  // const isLoading = useSelector(getContactsIsLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deletingId = useRef(null);

  const handleDeleteItem = () => {
    deletingId.current = id;
    deleteContact(id);
  }

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  }

  const handleSubmit = (item) => {
    if (item.name !== name || item.number !== number) {
      updateContact({ ...item, id });
    }
    setIsModalOpen(false);
  }
  const isDeleting = isLoading && deletingId.current === id;
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
          <a href={'tel:' + number} className={s.number}>{number}</a>
        </div>
        <div className={s.btnContainer}>
          <IconButton onClick={toggleModal} aria-label="edit"><EditIcon /></IconButton >
          <IconButton onClick={handleDeleteItem} aria-label="delete" disabled={isDeleting}>{isDeleting ? <CircularProgress size={24} /> : <DeleteForeverIcon />}</IconButton >
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

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import s from './userMenu.module.scss';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selector.auth';
import authOperations from 'redux/auth/operations.auth';


const UserMenu = (props) => {
  const username = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authOperations.logout());
  }

  return (
    <Box>
      <span>Hello, {username}</span>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  )
};

UserMenu.propTypes = {};

export default UserMenu;

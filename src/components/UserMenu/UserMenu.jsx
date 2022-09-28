import React from 'react';
// import PropTypes from 'prop-types';

import s from './userMenu.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selector.auth';
import authOperations from 'redux/auth/operations.auth';

// const getLinkClassName = ({ isActive }) => s.link + (isActive ? " " + s.active : "");

const UserMenu = () => {
  const username = useSelector(authSelectors.getUserName);
  const email = useSelector(authSelectors.getUserEmail);
  const isLoading = useSelector(authSelectors.getIsLoading);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authOperations.logout());
  }

  return (
    <div className={s.container}>
      {/* <NavLink to="/contacts" className={getLinkClassName}>Contacts</NavLink> */}
      <div>
        <div className={s.username}>Hello, {username}!</div>
        <div className={s.email}>({email})</div>
        <Button onClick={handleLogout} disabled={isLoading}>Logout {isLoading && <CircularProgress size={24} />}</Button>
      </div>
    </div>
  )
};

// UserMenu.propTypes = {};

export default UserMenu;

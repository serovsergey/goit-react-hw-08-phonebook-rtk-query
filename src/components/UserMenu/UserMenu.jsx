import React from 'react';
// import PropTypes from 'prop-types';

import s from './userMenu.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selector.auth';
import { unsetCredentials } from 'redux/auth/auth.slice';
import { useLogoutMutation } from 'services/contacts.api';
import { toast } from 'react-toastify';

// const getLinkClassName = ({ isActive }) => s.link + (isActive ? " " + s.active : "");

const UserMenu = () => {
  const username = useSelector(authSelectors.getUserName);
  const email = useSelector(authSelectors.getUserEmail);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(unsetCredentials());
    } catch (error) {
      toast.error(`Failed to logout with error ${error.message}`);
    }
  }
  return (
    <div className={s.container}>
      {/* <NavLink to="/contacts" className={getLinkClassName}>Contacts</NavLink> */}
      <div>
        <div className={s.username}>Hello, {username}!</div>
        <div className={s.email}>({email})</div>
        <Button onClick={handleLogout} disabled={isLoading}>Logout &nbsp; {isLoading && <CircularProgress size={24} />}</Button>
      </div>
    </div>
  )
};

// UserMenu.propTypes = {};

export default UserMenu;

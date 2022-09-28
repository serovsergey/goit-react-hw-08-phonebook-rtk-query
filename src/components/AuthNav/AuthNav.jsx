import React from 'react';
import PropTypes from 'prop-types';

import s from './authNav.module.scss';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
const getLinkClassName = ({ isActive }) => s.link + (isActive ? " " + s.active : "");

const AuthNav = (props) => {

  return (
    <Box>
      <nav>
        <NavLink to='/login' className={getLinkClassName}>Login</NavLink>
        <NavLink to='/register' className={getLinkClassName}>Register</NavLink>
      </nav>
    </Box>
  )
};

AuthNav.propTypes = {};

export default AuthNav;

import { Container } from '@mui/material';
import AuthNav from 'components/AuthNav/AuthNav';
import UserMenu from 'components/UserMenu';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import authSelectors from 'redux/auth/selector.auth';
// import PropTypes from 'prop-types';

import s from './SharedLayout.module.scss';

export const SharedLayout = (props) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Container maxWidth="sm">
      {/* <div className={s.container}> */}
      <header className={s.header}>
        <div className={s.logo}>
          Contacts
        </div>

        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <Suspense fallback={<div>Loading chunk...</div>}>
        <Outlet />
      </Suspense>
      {/* </div> */}
    </Container>
  )
};

// SharedLayout.propTypes = {};

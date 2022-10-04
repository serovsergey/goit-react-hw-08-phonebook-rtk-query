import { Container } from '@mui/material';
import AuthNav from 'components/AuthNav/AuthNav';
import UserMenu from 'components/UserMenu';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";
import authSelectors from 'redux/auth/selector.auth';
import { ReactComponent as AppLogo } from '../../assets/phone-book.svg';
// import PropTypes from 'prop-types';

import s from './sharedLayoutPage.module.scss';

const SharedLayoutPage = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Container maxWidth="md">
      {/* <div className={s.container}> */}
      <header className={s.header}>
        <Link className={s.logo} to="/">
          <AppLogo className={s.logoImg} />
          <span variant='h1' className={s.link}>PhoneBook</span>
        </Link>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {/* </div> */}
    </Container>
  )
};

// SharedLayoutPage.propTypes = {};

export default SharedLayoutPage;

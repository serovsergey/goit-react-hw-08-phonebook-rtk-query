import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selector.auth';

const PublicRoute = ({ restricted = false, redirectTo = '/contacts' }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn && restricted ? <Navigate to={redirectTo}></Navigate> : <Outlet />
};

PublicRoute.propTypes = {};

export default PublicRoute;

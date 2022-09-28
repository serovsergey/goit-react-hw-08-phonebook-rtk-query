import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/selector.auth';

const PrivateRoute = ({ redirectTo = '/' }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo}></Navigate>
};

PrivateRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default PrivateRoute;

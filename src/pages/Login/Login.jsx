import React from 'react';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';

import s from './login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/operations.auth';
import { useNavigate } from 'react-router-dom';
import authSelectors from 'redux/auth/selector.auth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(authSelectors.getIsLoading);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: 'serovsergey79@gmail.com',
      password: 'ssa260579',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(authOperations.login(values)).unwrap()
        .then(() => navigate('/contacts', { replace: true }));
      // console.log(resetForm)
      resetForm({});
    },
  });

  return (
    <Paper elevation={4} className={s.container}>
      <Typography component={'h2'} variant={'h4'} align={'center'}>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
          Login {isLoading && <CircularProgress size={24} />}
        </Button>
      </form>
    </Paper>
  )
};

// Login.propTypes = {};

export default Login;

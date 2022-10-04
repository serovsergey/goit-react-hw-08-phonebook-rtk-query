import React from 'react';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';

import s from './loginPage.module.scss';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/auth/auth.slice';
import { useLoginMutation } from 'services/contacts.api';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  // const isLoading = useSelector(authSelectors.getIsLoading);

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
      // email: 'serovsergey79@gmail.com',
      // password: 'ssa260579',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      login(values).unwrap()
        .then((user) => {
          dispatch(setCredentials(user));
        })

      // dispatch(authOperations.login(values)).unwrap()
      //   .catch((error) => toast.error(`Login failed with message: \n${error.message}`));
      // resetForm();
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
          Login &nbsp; {isLoading && <CircularProgress size={24} />}
        </Button>
      </form>
    </Paper>
  )
};

// LoginPage.propTypes = {};

export default LoginPage;

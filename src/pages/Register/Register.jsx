import React from 'react';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Paper, TextField, Typography } from '@mui/material';

import s from './register.module.scss';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/operations.auth';

const Register = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup
      .string('Enter your name')
      .required('Name is required'),
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
      name: 'sergey',
      email: '@gmail.com',
      password: '11111111',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(authOperations.register(values))
    },
  });

  return (
    <Paper elevation={4} className={s.container}>
      <Typography component={'h2'} variant={'h4'} align={'center'}>
        Register new user
      </Typography>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          fullWidth
          id="name"
          name='name'
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>
      </form>
    </Paper>
  )
};

// Register.propTypes = {};

export default Register;

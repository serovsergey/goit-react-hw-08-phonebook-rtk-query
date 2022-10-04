import React from 'react';
// import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Paper, TextField, Typography, CircularProgress } from '@mui/material';

import s from './registerPage.module.scss';
import { toast } from 'react-toastify';
import { useSignupMutation } from 'services/contacts.api';
import { setCredentials } from 'redux/auth/auth.slice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const [signup, { isLoading }] = useSignupMutation();
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
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {

      signup(values).unwrap()
        .then((user) => {
          console.log(user)
          dispatch(setCredentials(user));
          toast.info('You have registered!')
        })
        .catch((error) => toast.error(`Failed to register with error: \n${JSON.stringify(error)}`))
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
        <Button color="primary" variant="contained" type="submit" disabled={isLoading}>
          Register &nbsp; {isLoading && <CircularProgress size={24} />}
        </Button>
      </form>
    </Paper>
  )
};

// RegisterPage.propTypes = {};

export default RegisterPage;

import { Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import * as yup from 'yup';
import s from './ContactForm.module.scss'
import { useFormik } from 'formik';

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const phoneRegExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
const validationSchema = yup.object({
  name: yup
    .string('Enter contact name')
    .required('Name is required'),
  number: yup
    .string('Enter phone number')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Number is required'),
});

export const ContactForm = ({ onSubmit, onClose, initialData = null }) => {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name ?? '',
      number: initialData?.number ?? '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <>
      <Typography component={'h2'} variant={'h4'} align={'center'}>{initialData ? 'Edit contact' : 'New contact'}</Typography>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Contact Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="number"
          name="number"
          label="Phone Number"
          type="text"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <Button color="primary" variant="contained" type="submit">
          {initialData ? 'Save' : 'Add'}
          {/* Login {isLoading && <CircularProgress size={24} />} */}
        </Button>
        <Button type='button' onClick={onClose}>Cancel</Button>
      </form>
    </>
  )
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })])
}

export default ContactForm

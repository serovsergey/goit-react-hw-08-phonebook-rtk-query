import { Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction } from 'redux/filterReducer/actions.filter';
import { getFilter } from 'redux/filterReducer/selector.filter';
// import PropTypes from 'prop-types'
// import s from './Filter.module.scss'

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = evt => {
    dispatch(setFilterAction(evt.currentTarget.value));
  }

  return (
    <Paper>
      <TextField
        fullWidth
        id="filter"
        name="filter"
        label="Filter contacts by name"
        value={filter}
        onChange={handleChange}
      />
    </Paper>

  )
}

// Filter.propTypes = {}

export default Filter

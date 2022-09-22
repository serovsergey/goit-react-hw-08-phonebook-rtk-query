import { useDispatch, useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { setFilter } from '../../redux/filterSlice/slice.filter';
import s from './Filter.module.scss'

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = evt => {
    dispatch(setFilter(evt.currentTarget.value));
  }

  return (
    <div>
      <label className={s.label}>Filter contacts by name
        <input type='text' value={filter} onChange={handleChange} />
      </label>
    </div>

  )
}

// Filter.propTypes = {}

export default Filter

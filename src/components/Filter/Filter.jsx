import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction } from 'redux/filterReducer/actions.filter';
// import PropTypes from 'prop-types'
import s from './Filter.module.scss'

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleChange = evt => {
    dispatch(setFilterAction(evt.currentTarget.value));
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

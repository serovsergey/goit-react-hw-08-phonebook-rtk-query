import PropTypes from 'prop-types'
import s from './Filter.module.scss'

export const Filter = ({ value, onChange }) => {

  return (
    <label className={s.label}>Find contacts by name
      <input type='text' value={value} onChange={onChange} />
    </label>
  )
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Filter

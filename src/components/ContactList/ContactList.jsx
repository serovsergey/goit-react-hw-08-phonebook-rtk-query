import PropTypes from 'prop-types'
import s from './ContactList.module.scss'

export const ContactList = ({ contacts, onDeleteRecord }) => {

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          {name}: {number}
          <button onClick={() => onDeleteRecord(id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })).isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
}

export default ContactList

import PropTypes from 'prop-types'
import { shape } from 'prop-types';
import React, { Component } from 'react'
import s from './ContactList.module.scss'

export class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })).isRequired,
    onDeleteRecord: PropTypes.func.isRequired,
  }

  render() {
    const { contacts, onDeleteRecord } = this.props;
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
}

export default ContactList

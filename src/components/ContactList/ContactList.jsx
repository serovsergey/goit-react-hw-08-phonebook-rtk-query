import PropTypes from 'prop-types'
import React, { Component } from 'react'
import s from './ContactList.module.scss'

export class ContactList extends Component {
  static propTypes = {}

  render() {
    const { contacts } = this.props;
    return (
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={s.item}>
            {name}: {number}
            <button>Delete</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default ContactList

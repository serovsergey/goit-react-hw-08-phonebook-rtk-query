import PropTypes from 'prop-types'
import React, { Component } from 'react'
import s from './ContactForm.module.scss'

export class ContactForm extends Component {
  static propTypes = {}
  constructor() {
    super();
    this.state = {
      name: '',
      number: ''
    }
  }

  onInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <form className={s.form}>
        <label>Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.onInputChange}
          />
        </label>
        <label>Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.onInputChange}
          />
        </label>
        <button type='submit'>Add contact</button>
      </form>
    )
  }
}

export default ContactForm

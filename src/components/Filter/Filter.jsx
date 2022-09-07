import PropTypes from 'prop-types'
import React, { Component } from 'react'
import s from './Filter.module.scss'

export class Filter extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <label>Find contacts by name
        <input type='text' value={value} onChange={onChange} />
      </label>
    )
  }
}

export default Filter

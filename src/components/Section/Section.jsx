import PropTypes from 'prop-types'
import React, { Component } from 'react'
import s from './Section.module.scss'

export class Section extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  }

  render() {
    const { title, children } = this.props;
    return (
      <section>
        <div className={s.container}>
          {title && <h2>{title}</h2>}
          {children}
        </div >
      </section>
    )
  }
}

export default Section

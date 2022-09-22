import PropTypes from 'prop-types'
import s from './Section.module.scss'

export const Section = ({ title, children }) => {

  return (
    <section className={s.container}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}

export default Section

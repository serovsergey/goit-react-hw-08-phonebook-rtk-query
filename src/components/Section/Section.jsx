import PropTypes from 'prop-types'
import s from './Section.module.scss'

export function Section({ title, children }) {

  return (
    <section>
      <div className={s.container}>
        {title && <h2>{title}</h2>}
        {children}
      </div >
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

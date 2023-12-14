/* eslint-disable no-unused-vars */
import React from 'react'
import classes from './style.module.scss'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={classes.container}>
      <Link to={'/'} className={classes.title}>
        Alan Resto
      </Link>
    </div>
  )
}

export default Header

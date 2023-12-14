import classes from './style.module.scss'
import { Link } from 'react-router-dom'

const Tabs = () => {

  return (
    <div className={classes.container}>
      <div className={classes.link}>
        <Link to="/" className={classes.link__food}> Food </Link>
        <Link to="/transaction" className={classes.link__transaksi}> Transaksi </Link>
      </div>
    </div>
  )
}

export default Tabs

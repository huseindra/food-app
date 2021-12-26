import {Fragment} from 'react'

import classes from './Header.module.css'
import imageMeals from '../../assets/meals.jpeg'
import HeaderCartButton from './HeaderCartButton'
const Header = props => {

    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Food App</h1>
                <HeaderCartButton onClick={props.onShow} />
            </header>
            <div className={classes['main-image']}>
                <img src={imageMeals} alt="table of delicious food"/>
            </div>
        </Fragment>
    )
}

export default Header
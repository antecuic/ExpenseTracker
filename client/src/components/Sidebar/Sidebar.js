import React from 'react'
import styles from './Sidebar.module.css'

const sidebar = ({ show, logout } ) => {

    let classes = [ styles.Sidebar ]

    if(show) {
        classes.push(styles.Show)
    }

    return (
        <div className={classes.join(' ')}>
            <h1>My sidebar</h1>
            <LogoutButton clicked={logout}/>
        </div>
    )
}

export default sidebar
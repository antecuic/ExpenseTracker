import React from 'react'
import LogoutButton from '../UI/LogoutButton/logoutButton'
import AddIcon from '../UI/AddIcon/AddIcon'

const Footer = ({ addItemHandler, logoutHandler }) => {

    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10vh',
        padding: '15px',
  
        
    }

    return (
        <div style={style}>
            <LogoutButton clicked={logoutHandler}/>
            <AddIcon clicked={addItemHandler}/>
        </div>
    )

}

export default Footer
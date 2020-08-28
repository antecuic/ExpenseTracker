import React from 'react'
import styles from './InfoCard.module.css'

const InfoCard = props => {

    let { user } = props

    let content;
    const weekDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();
    const day = String(today.getDay())
    today = weekDays[day]+ ' ' + mm + '/' + dd + '/' + yyyy;


    if(user) {
        content = (
            <React.Fragment>
                <h3>{user.name}</h3>
                <p style={{fontWeight: '500', marginTop: '1rem'}}>Balance: <span style={{fontWeight: '600', marginTop: '1rem'}}>{user.balance} {user.currency}</span></p> 
                <p style={{fontWeight: '500', marginTop: '1rem'}}>{today}</p>
            </React.Fragment>
        )
    } else {
        content = <p>Loading...</p>
    }

    return (
        <div className={ styles.CardContainer }>
        {content}
        </div>
    )
}

export default InfoCard
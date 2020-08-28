import React from 'react'
import styles from './Item.module.css'

const Item = ({ item, clicked, user }) => {

    let classes = [styles.Item]
    let typeClass;

    if(item.type === 'income') {
        classes.push(styles.Income)
        typeClass = styles.IncomeType
    } else {
        classes.push(styles.Expense)
        typeClass = styles.ExpenseType

    }

    return (
        <div className={styles.Item} onClick={clicked}>
            <p style={{fontSize: '12px', marginBottom: '5px', fontWeight: '600'}}>{item.date.substring(0, 15)}</p>
            <p>{item.description}</p>
            <p style={{fontWeight: '600'}}>{item.value} {user.currency} <span className={typeClass}>{item.type}</span></p>
            
        </div>

    )
}

export default Item;
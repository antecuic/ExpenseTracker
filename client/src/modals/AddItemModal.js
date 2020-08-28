import React, { useEffect, useState } from 'react'
import styles from './AddItemModal.module.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UserService from '../services/user-service'

const AddItemModal = ({ user, showModal, setShouldUserUpdate }) => {

    const [ isDisabled, setIsDisabled ] = useState(true)
    const [ description, setDescription ] = useState('')
    const [ amount, setAmount ] = useState('')
    const [ type, setType ] = useState('income')

    let classes = [ styles.AddItemModal ]

    if(showModal) {
        classes.push(styles.Show)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await UserService.addItem(Number(amount), description, user._id, type)
        setDescription('')
        setAmount('')
        setShouldUserUpdate(true)
        
    }

    useEffect(() => {
        if(description.length >= 6 && amount > 0) {
        setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [description, amount])

    return (
        <div className={classes.join(' ')}>
            <h2>Add Item</h2>
            <form onSubmit={(e) => submitHandler(e)}>

                <select style={{width: '45%', height: '2rem'}} onChange={e => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="text" style={{width: '65%', height: '3.5rem', padding: '6px'}} value={description} placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                <input type="number" style={{width: '35%', height: '2rem', padding: '6px'}} value={amount} placeholder="Amount" onChange={e => setAmount(e.target.value)}/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.Button}
                    startIcon={<AddIcon />}
                    disabled={isDisabled}
                    >
                    Add
                </Button>
            </form>
        </div>
    )

}

export default AddItemModal
import React, { useState } from 'react'
import styles from './ItemModal.module.css'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UserService from '../services/user-service'


const ItemModal = ({ data, showModal, setShouldUserUpdate }) => {

    const [ change, setChange ] = useState(false)
    const [ descriptionValue, setDescriptionvalue ] = useState('')

    let classes = [ styles.ItemModal ]

    if(showModal) {
        classes.push(styles.Show)
    }

    const saveButtonHandler = async () => {
        await UserService.changeDescription(descriptionValue, data._id)
        setShouldUserUpdate(true)
        setDescriptionvalue('')
        setChange(false)
    }

    const deleteButtonHandler = async () => {
        await UserService.deleteByID(data._id, data.creator, data.value, data.type)
        setShouldUserUpdate(true)
    }

    const editModalHandler = () => {
        setChange(!change)
        setDescriptionvalue('')
    }

    let content = null
    if(data) {
        content = (
            <div>
                <h2 style={{marginBottom: '2rem'}}>Details</h2>
                <p><span>Amount: </span>{data.value}</p>
                <p><span>Date: </span>{data.date.slice(0,15)}</p>
                <p><span>Description: </span>{change ? <input type="text" minLength={6} placeholder={data.description} style={{maxWidth: '55%', height: '2rem', padding: '6px'}} onChange={e => setDescriptionvalue(e.target.value)}/> : data.description}</p>
                <p><span>Type: </span>{data.type}</p>
                <div className={styles.Buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={styles.Button}
                        startIcon={<DeleteIcon />}
                        onClick={deleteButtonHandler}
                        >
                        Delete
                    </Button>
                    {descriptionValue.length >= 6 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.Button}
                            startIcon={<SaveIcon />}
                            onClick={saveButtonHandler}
                        >
                            Save
                        </Button>) : null}
                    <IconButton aria-label="edit" onClick={editModalHandler}>
                        <EditIcon />
                    </IconButton>
                    
                </div>
            </div>
        )
    }

    return (
        <div className={classes.join(' ')}>
            {content}
        </div>
    )

}

export default ItemModal
import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { StylesProvider } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import UserService from '../../services/user-service'
import AuthService from '../../services/auth-service'
import InfoCard from '../../components/Cards/InfoCard'
import ItemCard from '../../components/Cards/Item'
import ItemInfoModal from '../../modals/ItemModal'
import AddItemModal from '../../modals/AddItemModal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import AddIcon from '../../components/UI/AddIcon/AddIcon'
import LogoutButton from '../../components/UI/LogoutButton/logoutButton';


const Home = props => {

    const [ user, setUser ] = useState()
    const [ shouldUserUpdate, setShouldUserUpdate ] = useState(false)
    const [ userBudget, setUserBudget ] = useState([])
    const [ showItemModal, setShowItemModal ] = useState(false)
    const [ modalInfo, setModalInfo ] = useState()
    const [ showBackdrop, setShowBackdrop ] = useState(false)
    const [ showAddItemModal, setShowAddItemModal ] = useState(false)
    // const [ showSidebar, setShowSidebar ] = useState(false)

    const handleCardClick = item => {
        setModalInfo(item)
        setShowItemModal(true)
        setShowBackdrop(true)

    }

    const addItemHandler = () => {
        setShowBackdrop(true)
        setShowAddItemModal(true)
    }

    const backdropClickedHandler = () => {
        setShowBackdrop(false)
        setShowItemModal(false)
        setShowAddItemModal(false)
        // setShowSidebar(false)
    }

    // const menuClickHandler = () => {
    //     // setShowSidebar(true)
    //     setShowBackdrop(true)
    // }

    const logoutHandler = async () => {
        await AuthService.logout()
        props.history.push("/")
    }


    useEffect(() => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)

        const fetchLoggedUser = async (user) => {
            let loggedUser = await UserService.getUser(user._id)
            let fetchedItems = await UserService.getItems(user._id)
            setUser(loggedUser.data)
            let items = fetchedItems.data
            setUserBudget(items)
        }
        
        user && fetchLoggedUser(user.user)
    }, [])

    useEffect(() => {

        const fetchLoggedUser = async (user) => {
            let loggedUser = await UserService.getUser(user._id)
            let fetchedItems = await UserService.getItems(user._id)
            setUser(loggedUser.data)
            let items = fetchedItems.data
            setUserBudget(items)
        }

        if(shouldUserUpdate && user) {
            fetchLoggedUser(user)
            setShouldUserUpdate(false)
            setShowItemModal(false)
            setShowBackdrop(false)
            setShowAddItemModal(false)
        }

    }, [shouldUserUpdate, user])

    return (
        <StylesProvider injectFirst>
            <Container maxWidth="sm" className={styles.Container}>
                {/* <MenuIcon clicked={menuClickHandler}/> */}
                {/* <Sidebar show={showSidebar} logout={logoutHandler}/> */}
                <ItemInfoModal data={modalInfo} showModal={showItemModal} setShouldUserUpdate={setShouldUserUpdate}/>
                <AddItemModal showModal={showAddItemModal} user={user} setShouldUserUpdate={setShouldUserUpdate}/>
                <Backdrop show={showBackdrop} clicked={backdropClickedHandler}/>
                    <div className={styles.UserInfoContainer}>
                        <InfoCard user={user}/> 
                    </div>
                    <div className={styles.ItemsContainer}>
                        {userBudget.length > 0 && userBudget.map((item, i) => (
                            <ItemCard key={i} item={item} user={user} clicked={() => handleCardClick(item)}/>
                        ))}    
                    </div>
                    <AddIcon clicked={addItemHandler}/>  
                    <LogoutButton clicked={logoutHandler}/>
            </Container>
        </StylesProvider>
    )
}

export default Home
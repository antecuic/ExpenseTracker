import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { StylesProvider } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import UserService from '../../services/user-service'
import AuthService from '../../services/auth-service'
import InfoCard from '../../components/Cards/InfoCard'
import ItemCard from '../../components/Cards/Item'
import AddIcon from '../../components/UI/AddIcon/AddIcon'
import LogoutButton from '../../components/UI/LogoutButton/logoutButton';



const Home = props => {

    const [ user, setUser ] = useState()
    const [ userBudget, setUserBudget ] = useState([])

    const handleCardClick = item => {
        props.history.push({
            pathname: '/itemInfo/'+ item._id,
            state: { item: item._id }
        })
    }

    const addItemHandler = () => {
        props.history.push('/addItem')
    }

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

    return (
        <StylesProvider injectFirst>
            <Container maxWidth="sm" className={styles.Container}>
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
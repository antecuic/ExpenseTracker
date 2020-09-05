import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { StylesProvider } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container'
import UserService from '../../services/user-service'
import AuthService from '../../services/auth-service'
import InfoCard from '../../components/Cards/InfoCard'
import ItemCard from '../../components/Cards/Item'
import Loader from '../../components/UI/Loader/Loader'
import Footer from '../../components/Footer/Footer';

const Home = props => {

    const [ user, setUser ] = useState()
    const [ userBudget, setUserBudget ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const handleCardClick = async (item) => {

        let response = await UserService.getSingleItem(item._id)

        props.history.push({
            pathname: '/itemInfo/'+ item._id,
            state: { item: response.data }
        })
    }
    
    const addItemHandler = () => {
        props.history.push('/addItem')
    }

    const logoutHandler = () => {
        AuthService.logout()
        props.history.push("/")
    }


    useEffect(() => {
        setIsLoading(true)
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
        setIsLoading(false)
    }, [])

    let content = <Loader/>

    if(!isLoading) {
        content = (
            <>
                <div className={styles.UserInfoContainer}>
                        <InfoCard user={user}/> 
                </div>
                <div className={styles.ItemsContainer}>
                    {userBudget.length > 0 && userBudget.map((item, i) => (
                        <ItemCard key={i} item={item} user={user} clicked={() => handleCardClick(item)}/>
                    ))}    
                 </div>
                
                <Footer addItemHandler={addItemHandler} logoutHandler={logoutHandler}/>
            </>
        )
    }

    return (
        <StylesProvider injectFirst>
            <Container maxWidth="sm" className={styles.Container}>
                    { content }
            </Container>
        </StylesProvider>
    )
}

export default Home
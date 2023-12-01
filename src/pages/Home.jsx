
import React from "react";
import { json, useNavigate } from "react-router-dom";
import {Button, Stack, Typography, } from '@mui/material'
import axios from 'axios'
import { Navbar } from "./Navbar";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
export function Home() {
    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    React.useEffect(()=>{
        const headers = {Authorization : localStorage.getItem("token")}
        const checkAuth = async()=>{
            try{
                const res = await axios.get('http://localhost:3000/admin/verify',{headers})
                console.log(res)
            }catch(err){
                navigate('/')
            }
            }
        try{
            checkAuth()
        }catch(err){
            // console.log(err)
            navigate('/Auth')
        }
        }
        ,[])

    function logOut(){
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    return(
            <Navbar/>
    )
        
}   

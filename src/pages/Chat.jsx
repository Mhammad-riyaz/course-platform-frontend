import React, { useEffect, useState } from 'react'
import Axios from 'axios'
export const Chat = () => {
    const fetchData = async()=>{
     let data = await Axios.get('http://127.0.0.1:5000/api/chat')
     console.log(data)
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>Chat</div>
  )
}

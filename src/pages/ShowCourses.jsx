import axios from "axios";
import React from "react";
import {CourseCard} from './CourseCard'
import { Stack,Box,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar.jsx";


export default function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const navigate = useNavigate()
    React.useEffect( ()=>{
        const headers = {Authorization : localStorage.getItem("token")}
        const getData = async()=>{
            try{
                const res = await axios.get('http://localhost:3000/admin/courses',{headers})
                const data = JSON.parse(res.data.courses)
                setCourses(data)
                setAuthorized(true)
            }catch(err){
                if(err.response.status==403) navigate('/login')
            }
        }
        getData()
    },[])



    
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    //     {courses.map(c => <Course key={c._id} title={c.title} />)}
    const Elements = courses.map((c)=><CourseCard key={c._id} title={c.title} description={c.description} />) 
    return(
        <div> 

            <SideBar></SideBar>
        <Typography variant="h2" textAlign={'center'} margin={'1em'} >Your courses</Typography>
        
        <Box   width={'100%'} display={"flex"} flexWrap={'wrap'} justifyContent={"center"} alignItems={'center'} gap={'1.5em'}>
        {Elements} 
        </Box>
        </div>)
    
}


import { Box, Button, Stack, TextField, Typography,Checkbox,FormControlLabel,FormControl } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar.jsx";

/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [publish, setPublish] = React.useState(false);

    const navigate = useNavigate()

     React.useEffect( ()=>{
        const headers = {Authorization : localStorage.getItem("token")}
        const getData = async()=>{
            try{
                const res = await axios.get('http://localhost:3000/admin/verify',{headers})
                }
            catch(err){
                if(err.response.status==403) navigate('/login')
            }
        }
        getData()
    },[])

    async function handleSubmit(){
        const headers = {
            Authorization : localStorage.getItem("token")
        }
               
        try{
            const res = await axios.post('http://localhost:3000/admin/courses',{title : title ,description :  description, price : price,published : publish},{headers})
            console.log(res.status)
                if(res.status == 201){
                    setTitle("");
                    setDescription("")
                    setPrice("")
                    setPublish(false)
                    navigate('/courses')
        }
    }
        catch(err){
            console.log(err)
        }
    }

    return <div>
        <SideBar></SideBar>
        <Stack  display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography variant="h3" >Create Course Page</Typography>
        <TextField type="text" required sx={{width:'20em',margin:'1em'}} value={title} label="Title" placeholder="title of the course" onChange={(e)=>setTitle(e.target.value)} ></TextField>
        <TextField type="text" required sx={{width:'20em',margin:'1em'}} value={description} label="Description" placeholder="about the course" onChange={(e)=>setDescription(e.target.value)} ></TextField>
        <TextField type="number" required sx={{width:'20em',margin:'1em'}} value={price} label="Price" placeholder="price of the course" onChange={(e)=>setPrice(e.target.value)} ></TextField>
        <FormControlLabel control={<Checkbox required checked={publish} />}  label="Publish" onChange={(e)=>setPublish(e.target.checked)}  />
        <Button variant="contained" sx={{width:'20em',margin:'1em'}}  type="submit" onClick={handleSubmit} >CREATE COURSE</Button>
        </Stack>
    </div>
}
export default CreateCourse;
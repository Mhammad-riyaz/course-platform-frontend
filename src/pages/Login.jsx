import React from "react";
import { TextField,Box, Stack, Typography ,Button, FormControl  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate()

    async function handleClick(){
        console.log(username,password)
        const headers = {
        'Content-Type': 'application/json',
        'username' :JSON.stringify(username),
        'password': JSON.stringify(password)
    };
    const body = {}
        const res = await axios.post("http://localhost:3000/admin/login",body,{headers})
        console.log(res)
        const data = JSON.parse(res.request.response)
        console.log(data.token)
        localStorage.setItem("token",data.token)
        console.log(res.request.status)
    if(res.request.status == 200) navigate('/courses')
    }

    return <div>
       <Stack width={"100%"} display={"flex"} alignItems={"center"} >
        <Box margin={'1em'}>
        <Typography variant="h3" fontWeight={'600'}> Hello there !</Typography>
        </Box>
        <Stack margin={'3em'} gap={'1.5em'} >
        <TextField id="outlined-basic" label="Username" type="text" variant="outlined"   placeholder="Enter your username" sx={{width : '20em',}} onChange={e=> setUsername(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" type="password" variant="outlined"   placeholder="Enter your password" sx={{width : '20em',}} onChange={e=> setPassword(e.target.value)}/>
        <Button type="submit" variant="contained" onClick={handleClick} >LOG IN</Button>
        </Stack>
        <Box>
        <Typography marginRight={'0.5em'} variant="p" fontFamily={"sans-serif"}>New here? </Typography>
            <Button variant="contained" sx={{width : '10em',}} onClick={()=>navigate('/register')} >SIGN UP</Button>
        </Box>
        
        </Stack>
    </div>
}

export default Login;
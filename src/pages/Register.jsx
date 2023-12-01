import React from "react";
import { TextField,Box, Stack, Typography ,Button, FormControl, Paper  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
    const navigate = useNavigate()
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    async function handleClick(){
        console.log(name,email,password)
        const headers = {
        'Content-Type': 'application/json',
        'username' :JSON.stringify(name),
        'email' : JSON.stringify(email),
        'password': JSON.stringify(password)
    };
    console.log(headers)
    const body = {}
        const res = await axios.post("http://localhost:3000/admin/signup",body,{headers})
        console.log(res)
        const data = JSON.parse(res.request.response)
        console.log(data.token)
        localStorage.setItem("token",data.token)
        if(res.request.status == 201) navigate('/about')
    }
    return <div>
        <Stack width={"100%"} display={"flex"} alignItems={"center"} >
        <Box margin={'1em'}>
        <Typography variant="h3" fontWeight={'600'}> Register to the website</Typography>
        </Box>
        <Stack margin={'3em'} gap={'1.5em'} >
        <TextField  label="Name"  required variant="outlined" type="text"  placeholder="Enter your name"  sx={{width : '20em',}} onChange={e=> setName(e.target.value)} />
        <TextField id="outlined-basic" required label="Email" type="email" variant="outlined"   placeholder="Enter your email" sx={{width : '20em',}} onChange={e=> setEmail(e.target.value)}/>
        <TextField id="outlined-basic" required label="Password" type="password" variant="outlined"   placeholder="Enter your password" sx={{width : '20em',}} onChange={e=> setPassword(e.target.value)}/>
        <TextField id="outlined-basic" required label="Confirm password" type="password" variant="outlined" placeholder="Confirm your password" sx={{width : '20em',}} />
        <Button type="submit" variant="contained" onClick={handleClick} >SIGN UP</Button>
        </Stack>
        <Box>
        <Typography marginRight={'0.5em'} variant="p" fontFamily={"sans-serif"}>Already a user? </Typography>
            <Button variant="contained" sx={{width : '10em',}} onClick={()=>navigate('/login')}  >Login</Button>
        </Box>
        </Stack>

    </div>
}

export default Register;
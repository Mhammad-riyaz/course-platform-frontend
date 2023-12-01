import React from 'react'
import {AppBar,Toolbar,IconButton,Stack,Typography,Button} from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar position='static' sx={{bgcolor:'gray'}} >
        <Toolbar>
            <Typography variant='h6' component='div'  sx={{flexGrow:1}}>
            </Typography>
            <Stack direction='row' spacing={2}>
                <Button color='inherit' >Features</Button>
                <Button color='inherit' >Features</Button>
                <Button color='inherit' >Features</Button>
                <Button color='inherit' >Features</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

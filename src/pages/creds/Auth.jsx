import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Stack, TextField, autocompleteClasses, createTheme } from '@mui/material';
import { blue, green, yellow } from '@mui/material/colors';
import { ThemeProvider, useTheme } from '@emotion/react';
import './Auth.css'
import  {LeftBar} from './LeftBar';
import {RightBar} from './RightBar';


export default function Height() {
  const theme =createTheme({
    palette:{
      primary: {
        main:'#3c3c3c'
      }
    }
  })

 
  return (
    // <ThemeProvider theme={theme}>
    <Box height={"99.69vh"}>
      <Stack direction={'row'}  height={'100%'}  justifyContent={'space-between'}>
        <LeftBar  />
        <RightBar/>
      </Stack>
    </Box>
    // </ThemeProvider>
     );
}

import { Box } from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import React from 'react'

export const LeftBar = () => {
  return (
    <Box bgcolor={'lightblue'} flex={1} sx={{display:{sm: "none",xs:'none',md : 'block'}}} ></Box>
  )
}

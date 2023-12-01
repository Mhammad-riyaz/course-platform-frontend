import React from 'react'
import { Card,CardMedia,Typography,Button,CardActions,CardContent } from '@mui/material'

export const CourseCard = (props) => {
  return (
    <Card sx={{ width: 355 }}>
    <CardMedia
      sx={{ height: 140 }}
      image="../src/assets/image.jpg"
      
    />
    <CardContent >
      <Typography gutterBottom variant="h5" component="div">
        {props.title}
      </Typography>
      <Typography  variant="body2" color="text.secondary">
        {props.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Edit</Button>
      <Button size="small">Remove</Button>
    </CardActions>
  </Card>
  )
}

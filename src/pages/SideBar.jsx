import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from 'react-router-dom';

export default function SideBar(props) {

  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = React.useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  //log out function
  
  function logOut(){
    localStorage.removeItem("token")
    console.log("logging out")
    navigate('/login')
    setIsLoggedIn(false)
}


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{marginTop:'2em',marginLeft:'0.5em'}}>
    
          <ListItem key={"Profile"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Settings"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Payments"} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PaymentsIcon/>
              </ListItemIcon>
              <ListItemText primary={"Payments"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Logout"} disablePadding>
            <ListItemButton onClick={logOut}>
              <ListItemIcon>
                <LogoutIcon></LogoutIcon>
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
      </List>
      
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <IconButton onClick={toggleDrawer('left',true)} >  <MenuIcon/> </IconButton>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list(<p>asdfadfas</p>)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

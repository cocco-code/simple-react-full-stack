import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
export default class ButtonAppBar extends React.Component{
    render(){
      return(
        <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="subheading" color="inherit" >
                Khurana Sales Buziness
            </Typography>
            </Toolbar>
        </AppBar>
      );
    }
  }
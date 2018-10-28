import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';


const styles = {
    list: {
      marginTop: 30,
      width: 250
    },
    fullList: {
      width: 'auto',
    },
  };

  const text = {
        color: "grey"
  }
export default class ButtonAppBar extends React.Component{
    state = {
        left: false
      };
    
    toggleDrawer = (side, open) => () => {
    this.setState({
        [side]: open,
    });
    };

    render(){

        const sideList = (
            <div className={"list"} style={styles.list}>
             <Typography variant="subtitle2" style={{marginTop: 10, marginLeft:10, color: "grey"}}>
               Account Details
              </Typography>
              <List>
                {['Login', 'Signup', 'My Cart', 'My Account'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon style={{height: 10, width: 10}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{text}</Typography>}/>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="subtitle2" style={{marginTop: 10, marginLeft:10, color: "grey"}}>
               Admin Operations
              </Typography>
              <List>
                  {['Notify Users', 'Promoters', 'My Notifications', 'Generate Exports', 'Outstanding Balance', 'Manage New Product', 
                'Manage Pre Bookings', 'Manage My Inventory'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon style={{height: 10, width: 10}}>{index%2==0? <InboxIcon></InboxIcon> : <MailIcon></MailIcon>}</ListItemIcon>
                        <ListItemText primary={<Typography style={{marginTop: 15}}>{text}</Typography>}></ListItemText>
                    </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="subtitle2" style={{marginTop: 10, marginLeft:10, color: "grey"}}>
               Web Support
              </Typography>
              <List>
                {['Edit Profile', 'Serivce Centers', 'Customer Care', 'Abount', 'Logout'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon style={{height: 10, width: 10}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{text}</Typography>} />
                  </ListItem>
                ))}
              </List>
            </div>
          );

      return(
        <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer("left",true)}/>
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
                    {sideList}
                </div>
            </Drawer>
            <Typography variant="subheading" color="inherit" >
                Khurana Sales Buziness
            </Typography>
            </Toolbar>
        </AppBar>
      );
    }
  }
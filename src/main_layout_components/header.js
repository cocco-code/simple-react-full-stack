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

import PersonIcon from '@material-ui/icons/Person';
import PersonPlus from '@material-ui/icons/PersonAdd';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MyAccount  from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications';
import Group from '@material-ui/icons/Group';
import NotificationsActive from '@material-ui/icons/NotificationImportant';
import Balance from '@material-ui/icons/AccountBalance';
import NewProduct from '@material-ui/icons/NewReleases';
import Poll from '@material-ui/icons/Poll';
import InventoryManage from '@material-ui/icons/LocalMall';
import Edit from '@material-ui/icons/Edit';
import ServiceCenter from '@material-ui/icons/MobileOff';
import CustomerCare from '@material-ui/icons/PhoneInTalk';
import About from '@material-ui/icons/Info';
import Logout from '@material-ui/icons/Lock';

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
                {
                  [
                  <ListItem button key={'Login'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<PersonIcon />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Login'}</Typography>}/>
                  </ListItem>,
                  <ListItem button key={'Signup'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<PersonPlus />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Signup'}</Typography>}/>
                  </ListItem>,
                  <ListItem button key={'My Cart'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<ShoppingCart />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'My Cart'}</Typography>}/>
                  </ListItem>,
                  <ListItem button key={'My Account'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<MyAccount />}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'My Account'}</Typography>}/>
                  </ListItem>
                ]
               }   
              </List>
              <Divider />
              <Typography variant="subtitle2" style={{marginTop: 10, marginLeft:10, color: "grey"}}>
               Admin Operations
              </Typography>
              <List>
                {[
                    <ListItem button key="Notify Users">
                        <ListItemIcon style={{height: 10, width: 10}}>{<Notifications />}</ListItemIcon>
                        <ListItemText primary={<Typography style={{marginTop: 15}}>{'Notify Users'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Promoters">
                        <ListItemIcon style={{height: 10, width: 10}}>{<Group/>}</ListItemIcon>
                        <ListItemText primary={<Typography style={{marginTop: 15}}>{'Promoters'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="My Notifications">
                      <ListItemIcon style={{height: 10, width: 10}}>{<NotificationsActive/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'My Notifications'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Generate Exports">
                      <ListItemIcon style={{height: 10, width: 10}}>{<Poll/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'Generate Exports'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Outstanding Balance">
                      <ListItemIcon style={{height: 10, width: 10}}>{<Balance/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'Outstanding Balance'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Manage New Product">
                      <ListItemIcon style={{height: 10, width: 10}}>{<NewProduct/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'Manage New Products'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Manage Prebookings">
                      <ListItemIcon style={{height: 10, width: 10}}>{<NewProduct/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'Manage Prebookings'}</Typography>}></ListItemText>
                    </ListItem>,
                    <ListItem button key="Manage My Inventory">
                      <ListItemIcon style={{height: 10, width: 10}}>{<InventoryManage/>}</ListItemIcon>
                      <ListItemText primary={<Typography style={{marginTop: 15}}>{'Manage My Inventory'}</Typography>}></ListItemText>
                    </ListItem>,
                ]}
              </List>
              <Divider />
              <Typography variant="subtitle2" style={{marginTop: 10, marginLeft:10, color: "grey"}}>
               Web Support
              </Typography>
              <List>
                {[
                   <ListItem button key={'Edit Profile'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<Edit/>}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Edit Profile'}</Typography>} />
                  </ListItem>,
                  <ListItem button key={'Service Centers'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<ServiceCenter/>}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Service Centers'}</Typography>} />
                  </ListItem>,
                  <ListItem button key={'Customer Care'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<CustomerCare/>}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Customer Care'}</Typography>} />
                  </ListItem>,
                  <ListItem button key={'About'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<About/>}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'About'}</Typography>} />
                  </ListItem>,
                  <ListItem button key={'Logout'}>
                    <ListItemIcon style={{height: 10, width: 10}}>{<Logout/>}</ListItemIcon>
                    <ListItemText primary={<Typography style={{marginTop: 15}}>{'Logout'}</Typography>} />
                  </ListItem>,
                ]}
              </List>
            </div>
          );

      return(
            <div>
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer("left",true)}/>
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} >
                <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
                    {sideList}
                </div>
            </Drawer>
            </div>
      );
    }
  }
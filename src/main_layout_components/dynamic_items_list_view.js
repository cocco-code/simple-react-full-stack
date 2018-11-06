import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ListSubheader, Typography } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import LabelImportant from '@material-ui/icons/LabelImportant'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    maxHeight: 400,
    overflowY: 'auto',
    padding: '15px',
    marginTop: '20px',
    backgroundColor: theme.palette.background.paper,
  },
});

class DynamicItemsList extends React.Component {

    constructor(props)
    {
        super(props);
        console.log("props received item list");
        console.log(props);
        this.state = {
            selectedIndex: 1,
            dataReceivable: {}
        }
    }
 
    
    componentWillReceiveProps(receivedProps)
    {
        console.log("final step");
        console.log(receivedProps);
        this.setState({
            ...this.state, dataReceivable: receivedProps
        })
    }

    shouldComponentUpdate(receivedProps)
    {
        console.log("item list shoud the final component update")
        return true;
    }

  handleListItemClick = (event, index) => {
    this.setState({...this.state, selectedIndex: index });
  };

  render() {
    const { classes } = this.props;
    console.log("location based output")
    console.log(this.state.dataReceivable.dataTransferable)
    var location = "";
    var data_renderable = {};
    var keys = [];
    if(this.state.dataReceivable.dataTransferable !== undefined)
    {
        location  = this.state.dataReceivable.dataTransferable.location;
        data_renderable = this.state.dataReceivable.dataTransferable.dataReceived[location+"_date_wise_collection"]    
        console.log("data renderable")
        console.log(data_renderable);
        keys = Object.keys(data_renderable);
        console.log(keys);
    }
   
    return (
      <div className={classes.root}>
        <List component="nav">
         
         {keys.map((element,index) => {
                return(
                    <ListItem
                    button
                    selected={this.state.selectedIndex === index}
                    onClick={event => this.handleListItemClick(event, index)}>
                    <ListItemIcon>
                      <LabelImportant />
                    </ListItemIcon>
                    <ListItemSecondaryAction style={{marginRight: 20}}>
                        <Typography>{"Total Received: " + data_renderable[element].length+ " Orders"}</Typography>
                      </ListItemSecondaryAction>
                    <ListItemText primary={element} />
                  </ListItem>   
                )
         })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(DynamicItemsList);
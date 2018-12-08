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
        this.self_update_done = false;
        this.state = {
            selectedIndex: 0,
            dataReceivable: {},
            data_category: 'dates',
            selected_data: ''
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
        if(this.self_update_done === false || (receivedProps !== undefined && this.state.dataReceivable.dataTransferable !== undefined && receivedProps.dataTransferable.location !== this.state.dataReceivable.dataTransferable.location))
        {
            console.log("item list shoud the final component update")
            this.self_update_done = true
            return true;    
        }
    }

  handleListItemClick = (event, index) => {
    this.self_update_done = false;
    this.setState({...this.state, selectedIndex: index });
    var location = "";
    var data_renderable = {};
    var keys = [];
    location  = this.state.dataReceivable.dataTransferable.location;
    data_renderable = this.state.dataReceivable.dataTransferable.dataReceived[location+"_date_wise_collection"]    
    keys = Object.keys(data_renderable)
    console.log("date clicked")
    console.log(keys[index])
    console.log(data_renderable[keys[index]])
    if(this.state.data_category === 'dates')
    {
        this.setState({...this.state, data_category: 'products', selected_data: keys[index]});
    }
    else if(this.state.data_category === 'products')
    {
        var location = "";
        var data_renderable = {};
        var keys = [];
        location = this.state.dataReceivable.dataTransferable.location;
        data_renderable = this.state.dataReceivable.dataTransferable.dataReceived[location+"_date_wise_collection"][this.state.selected_data]
        const data_products = this.state.dataReceivable.dataTransferable.dataReceived[location+"_product_wise_collection"];
        const selected_product = data_renderable[index];
        const data_batches = data_products[selected_product.product_name];
        console.log('selected product');
        console.log(selected_product);
        console.log("selected batches");
        console.log(data_batches);
        this.setState({...this.state, data_category: 'batches', selected_data: selected_product})
    }
  };

  render() {
    const { classes } = this.props;
    console.log("location based output")
    console.log(this.state.dataReceivable.dataTransferable)
    var location = "";
    var data_renderable = {};
    var data_products = {};
    var data_batches = [];
    var keys = [];
    if(this.state.dataReceivable.dataTransferable !== undefined)
    {
        if(this.state.data_category === 'dates')
        {
            location  = this.state.dataReceivable.dataTransferable.location;
            data_renderable = this.state.dataReceivable.dataTransferable.dataReceived[location+"_date_wise_collection"]    
            console.log("data renderable")
            console.log(data_renderable);
            keys = Object.keys(data_renderable);
            console.log(keys);

            const data_to_transfer = {};
            data_to_transfer["chart_type"]  = 'date'
            data_to_transfer['data'] = data_renderable;
            this.state.dataReceivable.callbackFromParent(data_to_transfer)
        }
        else if(this.state.data_category === 'products')
        {
            console.log('date selected');
            console.log(this.state.selected_data);
            location = this.state.dataReceivable.dataTransferable.location;
            data_renderable = this.state.dataReceivable.dataTransferable.dataReceived[location+"_date_wise_collection"][this.state.selected_data]
            data_products = this.state.dataReceivable.dataTransferable.dataReceived[location+"_product_wise_collection"];
            console.log("data renderable products")
            console.log(data_renderable);
            keys = Object.keys(data_renderable);
            console.log(keys);
            console.log('products should be shown')
      
            const data_to_transfer = {};
            data_to_transfer["chart_type"]  = 'products'
            data_to_transfer['data'] = data_renderable;
            this.state.dataReceivable.callbackFromParent(data_to_transfer)
      
        }
        else if(this.state.data_category === 'batches')
        {
            var location = "";
            var keys = [];
            location = this.state.dataReceivable.dataTransferable.location;
            const data_products = this.state.dataReceivable.dataTransferable.dataReceived[location+"_product_wise_collection"];
            const selected_product = this.state.selected_data
            data_batches = data_products[selected_product.product_name];
            console.log('selected product');
            console.log(selected_product);
            console.log("selected batches");
            console.log(data_batches);
            console.log('batches should be shown')
        }
    }
    switch(this.state.data_category)
    {
        case 'dates': 
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
                          <ListItemText primary={<Typography>{element}</Typography>} />
                        </ListItem>   
                      )
               })}
              </List>
            </div>
          );
          break ;
          case 'products':
            return(
                <div className={classes.root}>
                <List component="nav">
                {
                    data_renderable.map((element, index)=>{
                        return(
                        <ListItem
                        button
                        selected={this.state.selectedIndex === index}
                        onClick={event => this.handleListItemClick(event, index)}>
                        <ListItemIcon>
                          <LabelImportant />
                        </ListItemIcon>
                        <ListItemSecondaryAction style={{marginRight: 20}}>
                            <Typography>{"Total Sold: " + data_products[element.product_name].length+ " Units"}</Typography>
                          </ListItemSecondaryAction>
                        <ListItemText primary={<Typography>{element.product_name}</Typography>} secondary={"("+element.batch+")"} />
                      </ListItem>
                        ); 
                    })
                }
                </List>
              </div>
            );
            break;
          case 'batches':
          return(
            <div className={classes.root}>
                <List component="nav">
                {
                    data_batches.map((element, index)=>{
                        return(
                        <ListItem
                        button
                        selected={this.state.selectedIndex === index}
                        onClick={event => this.handleListItemClick(event, index)}>
                        <ListItemIcon>
                          <LabelImportant />
                        </ListItemIcon>
                        <ListItemSecondaryAction style={{marginRight: 20}}>
                            <Typography>{element.date_sold}</Typography>
                          </ListItemSecondaryAction>
                        <ListItemText primary={<Typography>{element.batch}</Typography>} secondary={"("+element.product_name+")"} />
                      </ListItem>
                        ); 
                    })
                }
                </List>
            </div>
            );
            break;
    }
  }
}

export default withStyles(styles)(DynamicItemsList);
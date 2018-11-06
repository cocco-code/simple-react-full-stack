import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import LocationWiseContainer from './location_wise_statistics_main_component';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  
    constructor(props)
    {
        console.log("props given: "+props)
        super(props);
        this.state = {
            value: 0,
            data: this.props.data
        };
        
    }

    componentWillReceiveProps(receivedProps)
    {
        this.setState({
            ...this.state, data: receivedProps.data}
        );
    }
    shouldComponentUpdate(receivedProps)
    {
        console.log("received props");
        console.log(receivedProps);
        return true
    }
  
    handleChange = (event, value) => {
        this.setState({...this.state,value: value});
    };

  render() {
    console.log("data present: ");
    console.log(this.state.data);
    console.log("locations: ");
    console.log(this.state.data["locations"]);
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
          {
            (this.state.data["locations"] !== undefined ) ? this.state.data["locations"].map( (location, index) => {
                return(
                    <Tab label={location} />);
            }) : ""
         }
          </Tabs>
        </AppBar>
        <LocationWiseContainer location = {this.state.data["locations"] && this.state.data["locations"][this.state.value]}dataReceived={this.state.data}></LocationWiseContainer>
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);

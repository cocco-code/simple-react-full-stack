import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'

function TabContainer({ dir,children }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }


export default class Footer extends React.Component{
    state = {
        value: 0,
      };

    handleChange = (event, value) => {
        this.setState({ value });
      };
    
      handleChangeIndex = index => {
        this.setState({ value: index });
      };
    
    render(){
        return(
            <AppBar position="static" color="default">
                <Tabs
                    value={this.state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                    fullWidth>
                    <Tab label="Mobile" />
                    <Tab label="Accessory" />
                </Tabs>
                <SwipeableViews
                    axis={'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}>
                    <TabContainer dir={'x'}>Item One</TabContainer>
                    <TabContainer dir={'x'}>Item Two</TabContainer>
                </SwipeableViews>
            </AppBar>
        );
    }
}
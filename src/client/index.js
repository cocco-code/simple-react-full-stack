import React from 'react';
import ReactDom from 'react-dom';
import Header from '../main_layout_components/header'
import CardView from '../main_layout_components/card_view'
import { Grid } from '@material-ui/core';
import OrderViewLayout from '../main_layout_components/orders_view'
import SearchAppBar from '../main_layout_components/search_app_bar'
import SearchProductComponent from '../main_layout_components/search_list_component'
class TopGrid extends React.Component{
    render(){
        return(
                <Grid container spacing={32} style={{marginTop: 20}}>
                    <Grid item xs>    
                        <div style={{marginTop: 30}}> 
                            <CardView image="../public/stock-image.jpg" title="Company Stock" description="  
                            Company Stock displays all information regarding the stock available with us , 
                            the company target to achieve and how much stock required to complete the company target
                            of selling" button1="View Stock" button2="Learn more">
                              </CardView>
                        </div>
                    </Grid>
                    <Grid item xs>    
                        <div style={{ marginTop: 30}}> 
                            <CardView image="" title="Manage Company Target" description="  
                            Company Target helps us resolving target maintenance activity to very simpler way, this show you all the 
                            brands u have target to achieve and how much has been achieved yet with easy interface" button1="View Targets" button2="Learn more"></CardView>
                        </div>
                    </Grid>
                    <Grid item xs>    
                        <div style={{ marginTop: 30}}> 
                            <CardView image="" title="Manage Company Statistics" description="  
                            Company statistics helps a buziness improve the buying of stock , selling of stock and then 
                            company can increase the revenue of the company by observing such statistics, this provides you easy interface for working" button1="View Statistics" button2="Learn more"></CardView>
                        </div>
                    </Grid>
                    <Grid item xs>    
                        <div style={{marginTop: 30}}> 
                            <CardView image="" title="Manage Company Orders" description="  
                           Company orders can help you with maintaining the orders invoice generation and maintaining, orders are completely fetched from
                           the orders generated by the selling system, orders get synced automatically" button1="View Orders" button2="Learn more"></CardView>
                        </div>
                    </Grid>
                </Grid>
        )
    }
}

class Central_Info_Grid extends React.Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return(
            <div>
            <OrderViewLayout></OrderViewLayout>
            </div>
        )
    }
}

class MainLayout extends React.Component{
    constructor(props){
        super(props)
        this.state = {products_list_visibility: false, products_recieved: []};
    }
    render(){
        var data_recieved=[];
        const searchChangesCallback= (res) => {
            console.log("i am in callback for data change");
            console.log("data recieved"+res.data);
            data_recieved = res;
            this.setState({products_recieved: data_recieved, products_list_visibility: (typeof(res.data) === 'string') ? false : true});
        }
        return(
            <div style={{overflowX: 'hidden',overflowY: 'hidden'}}>
                <div id="content" style={{marginTop: 65, position: "fixed", right: 10, float: "right", zIndex: 20}}>
                    {<SearchProductComponent visible={this.state.products_list_visibility} searched_data = {this.state.products_recieved}></SearchProductComponent> }
                </div>
                <SearchAppBar search_callback={searchChangesCallback}></SearchAppBar>
                <TopGrid></TopGrid>
                <Central_Info_Grid></Central_Info_Grid>
            </div>
        )
    }
}


ReactDom.render(<MainLayout></MainLayout>,document.getElementById("root"));
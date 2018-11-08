import React from 'react';
import { Bar }from 'react-chartjs-2';
import { Card, CardHeader, Typography, CardContent } from '@material-ui/core';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
  

export default class BrandWiseSellingComponent extends React.Component{
    
    constructor(props)
    {
        
        super(props);
        this.selected_item = '';
        this.products_map_created = '';
        this.product_chart_data_created = {};
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Brand Wise Selling Statistics',
                        data: [],
                        backgroundColor:[],
                    }
                ]
            },
            view_type: 'brands',
            list_data: {}
        }
    }

    componentDidMount()
    {
        function dynamicColors() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgba(" + r + "," + g + "," + b + ", 0.5)";}
            
        function poolColors(a) {
            var pool = [];
            var i = 0;
            for(i=0;i<a;i++){
                pool.push(dynamicColors());}
            return pool;
        }

        Axios.get(`http://khuranasales.co.in/webPortal/get_brand_wise_selling_rate.php`,{ crossDomain: true , headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*'}}).then(res => {
            console.log("brand wise selling");
            console.log(res.data.orders_with_brand);
            var data_for_brands = {};
                var brands = [];
                var totals = [];
                res.data.brand_wise_report.forEach(element => {
                     brands.push(element.brand);
                     totals.push(element.total)
                 });
                this.setState({chartData: {
                        labels: brands,
                        datasets: [{
                            label: "Brand Wise Selling Statistics",
                            data: totals,
                            backgroundColor: poolColors(totals.length)
                        }]
                }});

                res.data.orders_with_brand.forEach(element => {
                    if(data_for_brands[element.brand] === undefined)
                    {
                        data_for_brands[element.brand] = [];
                        data_for_brands[element.brand].push(element);
                    }
                    else{
                        data_for_brands[element.brand].push(element)
                    }
                })
                console.log("brand wise calculated report")
                console.log(data_for_brands);
                const keys = Object.keys(data_for_brands);
                console.log(keys)
                this.setState({...this.state, list_data: data_for_brands})
            });

    }
    handleListItemClick = (event, index, keys) =>
    {
        console.log('you clicked'+keys[index])
        this.selected_item = keys[index];
        if(this.state.view_type === 'brands')
        {
            this.setState({...this.state, view_type: 'products'})
        }
        else if(this.state.view_type === 'products')
        {
            this.setState({...this.state,view_type: 'batches' })
        }
    }
    render(){

        function dynamicColors() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgba(" + r + "," + g + "," + b + ", 0.5)";}
            
        function poolColors(a) {
            var pool = [];
            var i = 0;
            for(i=0;i<a;i++){
                pool.push(dynamicColors());}
            return pool;
        }

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();    
        var keys = [];
        var hashMap = {};
        var count_object = {};
        var values= [];
        var product_char_data = {};
        var batches = [];
        var sold_dates = [];
        var batch_locations = [];
        switch(this.state.view_type)
        {
            case 'brands':
                keys = Object.keys(this.state.list_data);
                break;
            case 'products':
                var data = this.state.list_data[this.selected_item]
                console.log("products keys generated");
                console.log(data);
                data.forEach(element => {
                    if(hashMap[element.sales_order_product_name] === undefined)
                    {
                        var object = {}
                        object["name"] = element.sales_order_product_name;
                        object["count"] = parseInt(element.sales_order_quantity);
                        object["batches"] = [];
                        object["dates"] = [];
                        object["batch_locations"] = [];
                        if(element.batches_selected !== undefined && element.batches_selected !== "" && element.batches_selected !== null)
                        {
                            var batches = element.batches_selected.split(",");
                            object["batches"] = object["batches"].concat(batches);    
                        }
                        else
                        {
                            var batches = Array(element.sales_order_quantity).fill("N/A");
                            object["batches"] = object["batches"].concat(batches);         
                        }

                        if(element.sales_order_batch_locations !== undefined && element.sales_order_batch_locations !== "" && element.sales_order_batch_locations !== null)
                        {
                            var batches_locations = element.sales_order_batch_locations.split(",");
                            object["batch_locations"] = object["batch_locations"].concat(batches_locations);    
                        }
                        else{
                            object["batch_locations"] = Array(element.sales_order_quantity).fill(" N/A ");     
                        }
                        object["dates"].push(element.sales_order_date);
                        hashMap[element.sales_order_product_name] = object
                        count_object[element.sales_order_product_name] = 1;
                    }
                    else{
                        if(element.batches_selected !== undefined && element.batches_selected !== "" && element.batches_selected !== null)
                        {
                            var batches = element.batches_selected.split(",");
                            hashMap[element.sales_order_product_name].batches = hashMap[element.sales_order_product_name].batches.concat(batches);    
                        }
                        else{
                            var batches = Array(element.sales_order_quantity).fill("N/A");
                            hashMap[element.sales_order_product_name].batches = hashMap[element.sales_order_product_name].batches.concat(batches);
                        }

                        if(element.sales_order_batch_locations !== undefined && element.sales_order_batch_locations !== "" && element.sales_order_batch_locations !== null)
                        {
                            var batches_locations = element.sales_order_batch_locations.split(",");
                            hashMap[element.sales_order_product_name].batch_locations =  hashMap[element.sales_order_product_name].batch_locations.concat(batches_locations);    
                        }
                        else{
                            hashMap[element.sales_order_product_name].batch_locations =  hashMap[element.sales_order_product_name].batch_locations.concat(Array(element.sales_order_quantity).fill(" N/A "));     
                        }

                        hashMap[element.sales_order_product_name].dates.push(element.sales_order_date);
                        hashMap[element.sales_order_product_name].count = parseInt(hashMap[element.sales_order_product_name].count) + parseInt(element.sales_order_quantity);
                        count_object[element.sales_order_product_name] = count_object[element.sales_order_product_name] + parseInt(element.sales_order_quantity);
                    }
                })
                console.log(hashMap)
                keys = Object.keys(count_object);
                values = Object.values(count_object);
                product_char_data = {
                    labels: keys,
                    datasets: [{
                        label: "Product Wise Selling Statistics",
                        data: values,
                        backgroundColor: poolColors(values.length)
                    }]
                }
                this.products_map_created = hashMap;
                this.product_chart_data_created = product_char_data;
                break;
                case "batches":
                    batches = this.products_map_created[this.selected_item].batches;
                    batch_locations = this.products_map_created[this.selected_item].batch_locations
                    keys = batches;
                    console.log("batches generated");
                    console.log(keys);
                    sold_dates = this.products_map_created[this.selected_item].dates;
                    console.log("sold dates");
                    console.log(sold_dates);
                break;
            }
       
        return(
            <div className="chart">
                <Card style={{minHeight: 500,maxHeight: 500, marginBottom: 20}}>
                    <CardHeader title={<Typography>Khurana Sales Brand Selling Statistics</Typography>}
                    subheader={date+`   Total Brands: ${this.state.chartData.labels.length}`}>
                        </CardHeader>
                    
                    <Grid container spacing={32}>
                        <Grid item xs ={6}>
                        <div className = {styles.root} style={{ width: '100%',
                            maxWidth: 600,
                            maxHeight: 400,
                            overflowY: 'auto',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '20px'}}>
                            <List container='nav'>  
                                {
                                    keys.map((element,index)=> {
                                        
                                        switch(this.state.view_type)
                                        {
                                            case 'brands': 
                                                var count = 0;
                                                this.state.list_data[element].forEach(element => {
                                                    count = count + parseInt(element.sales_order_quantity);
                                                })
                                                return(
                                                    <ListItem
                                                        button
                                                        selected={this.state.selectedIndex === index}
                                                        onClick={event => this.handleListItemClick(event, index, keys)}>
                                                        <ListItemIcon>
                                                        <LabelImportant />
                                                        </ListItemIcon>
                                                        <ListItemSecondaryAction style={{marginRight: 20}}>
                                                            <Typography>{"Total "+this.state.list_data[element].length+" Orders Received "}</Typography>
                                                        </ListItemSecondaryAction>
                                                        <ListItemText primary={element} secondary={"( Total "+count+" Items Sold )"} />
                                                    </ListItem>
                                                    )
                                                    break;
                                                case 'products':
                                                return(
                                                    <ListItem
                                                        button
                                                        selected={this.state.selectedIndex === index}
                                                        onClick={event => this.handleListItemClick(event, index, keys)}>
                                                        <ListItemIcon>
                                                        <LabelImportant />
                                                        </ListItemIcon>
                                                        <ListItemSecondaryAction style={{marginRight: 20}}>
                                                            <Typography>{"Total "+hashMap[element].batches.length+" Units Sold "}</Typography>
                                                        </ListItemSecondaryAction>
                                                        <ListItemText primary={<Typography>{element}</Typography>}secondary={""} />
                                                    </ListItem>
                                                    )
                                                    break;    
                                                case 'batches':
                                                return(
                                                    <ListItem
                                                        button
                                                        selected={this.state.selectedIndex === index}
                                                        onClick={event => this.handleListItemClick(event, index, keys)}>
                                                        <ListItemIcon>
                                                        <LabelImportant />
                                                        </ListItemIcon>
                                                        <ListItemSecondaryAction style={{marginRight: 20}}>
                                                            <Typography>{"Sold On "+sold_dates[index]}</Typography>
                                                        </ListItemSecondaryAction>
                                                        <ListItemText primary={<Typography>{element}</Typography>}secondary={"( "+batch_locations[index]+" )"} />
                                                    </ListItem>
                                                    )
                                                break;    
                                        }
                                       
                                    })
                                }
                            </List>
                        </div>
                        </Grid>
                        <Grid item xs = {6}>
                            <Bar data={(this.state.view_type === 'products' || this.state.view_type === 'batches' ) ? this.product_chart_data_created : this.state.chartData}
                            options={{ barThickness: 'flex',showAllTooltips: true,tooltips: {enabled: true, mode: 'index'},  scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        barPercentage: 0.5
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    label: true
                                }]
                            },elements: {
                                rectangle: {
                                  borderSkipped: 'left',
                                }
                              },maintainAspectRatio: true, responsive: true,title: {display: true, text: "Selling Statistics"}, }}>
                            </Bar>
                        </Grid>   
                    </Grid>     
                </Card>
            </div>
        )
    }
}
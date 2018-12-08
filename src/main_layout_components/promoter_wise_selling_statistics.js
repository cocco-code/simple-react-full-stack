import React from 'react';
import { Bar }from 'react-chartjs-2';
import { Grid, Card, CardHeader, Typography, CardContent } from '@material-ui/core';
import Axios from 'axios';
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
  
export default class PromoterSellingComponent extends React.Component{
    constructor(props)
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
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Promoter Wise Selling Statistics',
                        data: [],
                        backgroundColor:[],
                    }
                ]
            }
        }
    }

    componentWillMount(){
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

        Axios.get(`http://khuranasales.co.in/webPortal/get_promoter_wise_selling_rate.php`,{ crossDomain: true , headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*'}}).then(res => {
            console.log("promoter wise selling rate"+res.data[0].total);
                var promoters = [];
                var totals = [];
                res.data.forEach(element => {
                     promoters.push(element.promoter_name);
                     totals.push(element.total_sold)
                 });
                this.setState({chartData: {
                        labels: promoters,
                        datasets: [{
                            label: "Promoter Wise Selling Statistics",
                            data: totals,
                            backgroundColor: poolColors(totals.length)
                        }]
                }});
            });
    }

    render(){
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();    
       
        return(
            <div className="chart">
                <Card style={{minHeight: 500,maxHeight: 500, marginBottom: 20}}>
                    <CardHeader title={<Typography>Khurana Sales Promoter Selling Statistics</Typography>}
                    subheader={date+`   Total Promoters: ${this.state.chartData.labels.length}`}>
                        </CardHeader>
                    <Grid container spacing={32}>
                        <Grid item xs={6}>
                        <div className = {styles.root} style={{ width: '100%',
                            maxWidth: 600,
                            maxHeight: 400,
                            overflowY: 'auto',
                            padding: '10px',
                            marginTop: '5px',
                            marginBottom: '20px'}}>
                            <List container='nav'> 
                                {this.state.chartData.labels.map((element,index) => {
                                    return(
                                        <ListItem
                                        button
                                        selected={this.state.selectedIndex === index}>
                                        <ListItemIcon>
                                        <LabelImportant />
                                        </ListItemIcon>
                                        <ListItemSecondaryAction style={{marginRight: 20}}>
                                            <Typography>{"Total "+this.state.chartData.datasets[0].data[index]+" Orders Completed "}</Typography>
                                        </ListItemSecondaryAction>
                                        <ListItemText primary={element} secondary={"( Promoter )"} />
                                        </ListItem>
                                    );
                                })
                                }
                            </List>
                        </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Bar data={this.state.chartData}
                            options={{ tooltips: {enabled: true, mode: 'label'}, scales: {
                                xAxes: [{
                                    ticks: {
                                        autoSkip: false
                                    },
                                    label: true
                                }]},maintainAspectRatio: true, responsive: true,title: {display: true, text: "Selling Statistics"}, }}>
                            </Bar>
                        </Grid>
                    </Grid>
                    </Card>
            </div>
        )
    }
}
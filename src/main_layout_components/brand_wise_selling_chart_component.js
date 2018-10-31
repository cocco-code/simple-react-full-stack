import React from 'react';
import { Bar }from 'react-chartjs-2';
import { Card, CardHeader, Typography, CardContent } from '@material-ui/core';
import Axios from 'axios';
export default class BrandWiseSellingComponent extends React.Component{
    
    
    constructor(props)
    {
        
        super(props);
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
            }
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
            console.log("brand wise selling rate"+res.data[0].total);
                var brands = [];
                var totals = [];
                res.data.forEach(element => {
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
            });
    }
    render(){
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();    
       
        return(
            <div className="chart">
                <Card style={{minHeight: 500,maxHeight: 500, marginBottom: 20}}>
                    <CardHeader title={<Typography>Khurana Sales Brand Selling Statistics</Typography>}
                    subheader={date+`   Total Brands: ${this.state.chartData.labels.length}`}>
                        </CardHeader>
                    <Bar data={this.state.chartData}
                        options={{maintainAspectRatio: true, responsive: true,title: {display: true, text: "Selling Statistics"}, }}>
                        </Bar>
                </Card>
            </div>
        )
    }
}
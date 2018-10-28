import React, { Children } from 'react';
import ReactDom from 'react-dom';
import Card from '@material-ui/core/Card'
import { CardHeader, IconButton, Typography, CardContent } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Autorenew';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination'

export default class orders_view_layout extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {orders: []}
        this.data = {
            'from_date': '27-10-2018'    
        }
    }

   componentDidMount(){
    Axios.post(`http://khuranasales.co.in/work/get_orders_desktop.php`,this.data,{ crossDomain: true , headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*'}}).then(res => {
        console.log(res);    
        this.setState({orders: res.data});  
        console.log("state: "+this.state.orders.reverse);
        });
    };
    render()
    {
        console.log("orders received"+this.state.orders)
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();    
        return(
            <div> 
                <Card style={{marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}} >
                    <CardHeader  
                        action={<IconButton style={{marginTop: 10}}
                        ><RefreshIcon></RefreshIcon></IconButton>}
                        title={<Typography> Khurana Sales Orders </Typography>}
                        subheader={date}>
                    </CardHeader>
                    <CardContent style={{height: 650, overflowY: 'auto', overflowX: 'hidden' , zIndex: 20}}>
                        <Table className={"orders_table"}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell numeric>Total Count</TableCell>
                                <TableCell numeric>Sale Price</TableCell>
                                <TableCell numeric>Order Number</TableCell>
                                <TableCell numeric>Invoice Status</TableCell>
                                <TableCell numeric>Paytm Payment</TableCell>
                                <TableCell numeric>Finance Payment</TableCell>
                                <TableCell numeric>Discount Amount</TableCell>
                                <TableCell numeric>Credit Payment</TableCell>
                                <TableCell numeric>Cheque Payment</TableCell>
                                <TableCell numeric>Cash Payment</TableCell>
                                <TableCell numeric>Card Payment</TableCell>
                                <TableCell numeric>Batches Selected</TableCell>
                           
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map(order => {
                                return (
                                <TableRow key={order.batches_selected}>
                                    <TableCell component="th" scope="row">
                                    {order.sales_order_product_name}
                                    </TableCell>
                                    <TableCell numeric>{order.sales_order_product_count}</TableCell>
                                    <TableCell numeric>{order.sales_order_price}</TableCell>
                                    <TableCell numeric>{order.sales_order_number}</TableCell>
                                    <TableCell numeric>{order.invoice_status}</TableCell>
                                    <TableCell numeric>{order.paytm_payment}</TableCell>
                                    <TableCell numeric>{order.finance_payment}</TableCell>
                                    <TableCell numeric>{order.discount_amount}</TableCell>
                                    <TableCell numeric>{order.credit_payment}</TableCell>
                                    <TableCell numeric>{order.cheque_payment}</TableCell>
                                    <TableCell numeric>{order.cash_payment_amount}</TableCell>
                                    <TableCell numeric>{order.card_payment}</TableCell>
                                    <TableCell numeric>{order.batches_selected}</TableCell>
                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
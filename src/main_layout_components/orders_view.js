import React, { Children } from 'react';
import Card from '@material-ui/core/Card'
import { CardHeader, IconButton, Typography, CardContent, CardActions } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Autorenew';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid'
export default class orders_view_layout extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {orders: [], total_credit: 0, total_sales: 0, total_discount: 0, total_cash: 0, total_card: 0, total_finance: 0, total_paytm: 0, total_cheque: 0}
        this.data = {
            'from_date': '15-08-2018'    
        }
    }

    shouldComponentUpdate(props)
    {
        if(props === undefined)
        {
            return false 
        }
        else
        {
            return true
        }
    }
   componentDidMount(){
    Axios.post(`http://khuranasales.co.in/work/get_orders_desktop.php`,this.data,{ crossDomain: true , headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*'}}).then(res => {
        var total_sales_income  = 0; 
        var total_discount_amount = 0;
        var total_cash_payment = 0;
        var total_card_payment = 0;
        var total_finance_payment = 0;
        var total_credit_payment = 0;
        var total_paytm_payment = 0;
        var total_cheque_payment = 0;

        res.data.forEach(element => {
            total_sales_income = total_sales_income + parseInt(element.sales_order_price * element.sales_order_product_count);
            total_discount_amount = total_discount_amount + parseInt(element.sales_order_discount);
            total_cash_payment = total_cash_payment + parseInt(element.cash_payment_amount);
            if(element.cheque_payment !== 'NO')
            {
                total_cheque_payment = total_cheque_payment + parseInt(element.cheque_payment);
            }
            if(element.paytm_payment !== 'NO')
            {
                total_paytm_payment = total_paytm_payment + parseInt(element.paytm_payment);
            }
            if(element.credit_payment !== "NO")
            {
                total_credit_payment = total_credit_payment + parseInt(element.credit_payment);      
            }
            const card_payment_info = element.card_payment;
            const finance_payment_info = element.finance_payment;
            if(finance_payment_info !== 'NO')
            {
                const start_index = finance_payment_info.indexOf("(");
                const end_index = finance_payment_info.indexOf(")");
                const final_info = finance_payment_info.substring(start_index+1, end_index);
                total_finance_payment = total_finance_payment + parseInt(final_info);
            }
            if(card_payment_info !== 'NO')
            {
                const index = card_payment_info.indexOf("(");
                const payment_amount  = card_payment_info.substring(0, index);
                total_card_payment = total_card_payment + parseInt(payment_amount);
            }
        });
        this.setState({orders: res.data, total_sales: total_sales_income, total_discount: total_discount_amount, total_cash: total_cash_payment, total_card: total_card_payment,
                    total_finance: total_finance_payment, total_credit: total_credit_payment, total_paytm: total_paytm_payment, total_cheque: total_cheque_payment
        }); 
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
                        action={
                        <IconButton style={{marginTop: 10}}>
                        <RefreshIcon></RefreshIcon>
                        </IconButton>
                        }
                        title={<Typography> Khurana Sales Orders </Typography>}
                        subheader={date}>
                    </CardHeader>
                    <CardContent style={{height: 750, overflowY: 'auto', overflowX: 'hidden' , zIndex: 20}}>
                        <Table className={"orders_table"}>
                            <TableHead>
                            <TableRow>
                                <TableCell style={{color: "inherit"}}>Product Name</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Total Count</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Sale Price</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Order Number</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Invoice Status</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Paytm Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Finance Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Discount Amount</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Credit Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Cheque Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Cash Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Card Payment</TableCell>
                                <TableCell numeric style={{color: "blue"}}>Batches Selected</TableCell>
                           
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.orders.map( (order, index) => {
                                return (
                                <TableRow key={index}>
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
                    <div style={{marginTop: 20, marginLeft: 10}}>
                        <Grid container spacing={32}>
                            <Grid item xs={8}>
                                <Grid container spacing={32}>
                                    <Grid item xs={4}>
                                        <div id="total_sale" style={{margin: 10}}>
                                             <Typography> Total Sale</Typography>
                                             <Typography style={{color: 'blue'}}>Rs. {this.state.total_sales} /-</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                    <div id="total_discount"  style={{margin: 10}}>
                                        <Typography> Total Discount Provided: </Typography>
                                        <Typography style={{color: 'blue'}}>Rs. {this.state.total_discount} /-</Typography>
                                     </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item xs={8}>
                                <Grid container spacing={32}>
                                    <Grid item xs={4}>
                                    <div id="total_finance"  style={{margin: 10}}>
                                        <Typography> Total Finance Payment: </Typography>
                                        <Typography style={{color: 'blue'}}>Rs. {this.state.total_finance} /-</Typography>
                                    </div> 
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div id="total_paytm"  style={{margin: 10}}>
                                            <Typography> Total Paytm Payment: </Typography>
                                            <Typography style={{color: 'blue'}}>Rs. {this.state.total_paytm} /-</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item xs={8}>
                                <Grid container spacing={32}>
                                    <Grid item xs={4}>
                                    <div id="total_card"  style={{margin: 10}}>
                                        <Typography> Total Card Payment: </Typography>
                                        <Typography style={{color: 'blue'}}>Rs. {this.state.total_card} /-</Typography>
                                    </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div id="total_cheque"  style={{margin: 10}}>
                                            <Typography> Total Cheque Payment: </Typography>
                                            <Typography style={{color: 'blue'}}>Rs. {this.state.total_cheque} /-</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={32}>
                            <Grid item xs={8}>
                                <Grid container spacing={32}>
                                    <Grid item xs={4}>
                                        <div id="total_cash"  style={{margin: 10}}>
                                            <Typography> Total Cash Payment: </Typography>
                                            <Typography style={{color: 'blue'}}>Rs. {this.state.total_cash} /-</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div id="total_credit"  style={{margin: 10}}>
                                            <Typography> Total Credit Payment: </Typography>
                                            <Typography style={{color: 'blue'}}>Rs. {this.state.total_credit} /-</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </div>
        )
    }
}
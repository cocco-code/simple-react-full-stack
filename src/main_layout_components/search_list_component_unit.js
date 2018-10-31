import React from 'react';
import Card from '@material-ui/core/Card';
import { Typography, CardHeader, CardContent, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    card_style: {
        height: 300,
        marginLeft: 5,
        marginRight: 5
    }
}
const SearchComponentItem = (props) =>{
    const name = props.name
    const item_id = props.id
    const mrp_price = props.mrp_price;
    const mop_price = props.mop_price;
    const ks_price = props.ks_price;
    const stocks = props.stock
    return (
        <div>
            <Card style={styles.card_style}>
                <CardHeader
                title={<Typography>{name}</Typography>}
                subheader={"Product Id: "+item_id+"    Units In Stock: ( "+stocks+" )"}
                action={<EditIcon style={{width: 15,height: 15}}></EditIcon>}>
                </CardHeader>
                <CardContent>
                    <Grid container spacing={32}>
                        <Grid item xs={12}>
                           <Grid container spacing={32}>
                                <Grid item xs={2}>
                                    <Avatar alt="Mop Price" src="../public/tag.png" className={"avatar"} style={{margin: 10, width: 20, height: 20}} />
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 10}}>
                                    <Typography style={{color: 'blue'}}>Rs {mop_price} /-</Typography>
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 8}}>
                                    <Typography style={{color: 'red'}}>(Mop price)</Typography>
                                </Grid>
                           </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={32}>
                                <Grid item xs={2}>
                                    <Avatar alt="Mrp price" src="../public/tag.png" className={"avatar"} style={{margin: 10, width: 20, height: 20}} />
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 10}}>
                                    <Typography style={{color: 'blue'}}>Rs {mrp_price} /-</Typography>
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 8}}>
                                    <Typography style={{color: 'red'}}>(Mrp price)</Typography>
                                </Grid>
                           </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={32}>
                                <Grid item xs={2}>
                                    <Avatar alt="Mrp price" src="../public/tag.png" className={"avatar"} style={{margin: 10, width: 20, height: 20}} />
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 10}}>
                                    <Typography style={{color: 'blue'}}>Rs {ks_price} /-</Typography>
                                </Grid>
                                <Grid item xs={5} style={{marginTop: 8}}>
                                    <Typography style={{color: 'red'}}>(Ks price)</Typography>
                                </Grid>
                           </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default SearchComponentItem;
import React from 'react';
import Card from '@material-ui/core/Card';
import { Typography, CardHeader } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
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
    return (
        <div>
            <Card style={styles.card_style}>
                <CardHeader
                title={<Typography>{name}</Typography>}
                subheader={"Product Id: "+item_id}
                action={<EditIcon style={{width: 15,height: 15}}></EditIcon>}>
                </CardHeader>
            </Card>
        </div>
    );
}

export default SearchComponentItem;
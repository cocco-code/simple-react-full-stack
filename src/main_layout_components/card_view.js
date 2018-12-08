import React from 'react';
import ReactDom from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = {
    card: {
       zIndex: 10,
       maxWidth: 345,
    },
    media: {
      height: 160,
    },
  };
  
export default class CardView extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();    
        return(
            <Card className={"card_view"} style={styles.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={"avatar"}>
                    K
                    </Avatar>
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={this.props.title}
                subheader={date}
            />
            <CardActionArea>
                <CardMedia
                className={"card_media"}
                image={this.props.image}
                title={this.props.title}
                style={styles.media}
                />
                <CardContent>
                <Typography gutterBottom variant="subtitle1" component="h2">
                   {this.props.title}
                </Typography>
                <Typography component="p">
                    {this.props.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                {this.props.button1}
                </Button>
                <Button size="small" color="primary">
                {this.props.button2}
                </Button>
            </CardActions>
            </Card>
        )
    }
}

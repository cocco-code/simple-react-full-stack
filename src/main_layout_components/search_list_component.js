import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import './animation.css';
import { CardHeader, Typography, CardContent, CardActions } from '@material-ui/core';
import SearchComponentItem from './search_list_component_unit';
import {List, ListItem, Divider, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
class SearchProductComponent extends React.Component{
    constructor (props) {
        super(props);
        this.state = {visible: this.props.visible, searched_data: this.props.searched_data}
        this.changeViewStateToInvisible = this.changeViewStateToInvisible.bind(this)
    }

    componentWillReceiveProps(nextProps){
        console.log("component is recieving props");
    }

    componentDidMount(){
        console.log("mounting component")
    }
   
    shouldComponentUpdate(props){
        this.props = props;
        console.log("in should component update");
        console.log("props recieved"+this.props.searched_data.data);
        console.log("data type"+(typeof(this.props.searched_data.data) === 'string'));
        if(this.props.searched_data.data !== undefined && !(typeof(this.props.searched_data.data) === 'string')) 
        {
            console.log("in if of shoul component update");
            console.log("props length: "+this.props.searched_data.data.length)
            if(this.props.visible === true && this.state.visible !== true)
            {
                this.setState({visible: true});
            }
        }
        else{
            console.log("in else of shoul component update");
            console.log("props"+this.props.visible);
            console.log("state"+this.state.visible);
            
            if(this.props.visible === false && this.state.visible !== false)
            {
                this.setState({visible: false});
            }    
        }
       
        return true;
    }
    
    changeViewStateToInvisible = () =>
    {
        this.setState({...this.state, visible: false})
    }
    render() {
        return (
            <div>
            <Card className={this.state.visible? 'fadeIn': 'fadeOut'} raised={true} style={{ background: "#ffffff", width: 360,minHeight:650, maxHeight: 650, zIndex: 50,}}>
                <CardHeader style={{width: 320,background: '#ffffff',position: 'fixed'}}
                title={<Typography> Khurana Sales Stock Search </Typography>} subheader={`Items found    ${ this.props.searched_data.data===undefined ? 0 : this.props.searched_data.data.length}`}
                action={
                    <IconButton style={{float: 'right'}}>
                      <CloseIcon onClick={this.changeViewStateToInvisible}/>
                    </IconButton>}> 
                </CardHeader>
                <div style={{marginTop: 65, minHeight:570,maxHeight: 570,overflowY: 'scroll'}}>
                    {this.props.searched_data.data !== undefined ? this.props.searched_data.data.map(object => ( 
                     <div key={object.product_id}>    
                    <SearchComponentItem name={object.Name} id={object.product_id}>
                    </SearchComponentItem> <Divider style={{marginLeft: 5, marginRight: 5, marginTop: 5}}/> 
                    </div>)) : ""}
                </div>
            </Card>
            </div>
        );
    }
}

export default SearchProductComponent;

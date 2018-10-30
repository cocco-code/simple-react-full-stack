import React from 'react';
import {findDOMNode} from 'react-dom';
import Paper from '@material-ui/core/Paper'
import './animation.css';

class SearchProductComponent extends React.Component{
    constructor (props) {
        super(props);
        this.state = {visible: this.props.visible, searched_data: this.props.searched_data}
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
    
    render() {
        return (
            <Paper className={this.state.visible? 'fadeIn': 'fadeOut'} style={{ background: "#ffffff", width: 320,height: 600, zIndex: 50,}}/>    
        );
    }
}

export default SearchProductComponent;

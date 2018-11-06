import React from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ScrollableTabsButtonAuto from './godown_tab_panes'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios';

export default class MainTabContainer extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {total_godowns: 0, data_hierarchy_complete: {}}
    }
    componentDidMount()
    {

        Axios.get(`http://khuranasales.co.in/work/get_godown_wise_product_selling.php`,{ crossDomain: true , headers: {"Content-Type": "application/json",'Access-Control-Allow-Origin': '*'}}).then(res => {
            console.log("location wise selling rate"+res.data);
            var data = res.data;
            var keys = Object.keys(data);
            console.log(keys);
            var data_hierarchy = {};
            keys.forEach(element => {
                console.log("length with location "+element+"  "+data[element].length);
                data_hierarchy[element] = data[element];
                var data_hierarchy_date = {};
                var data_hierarchy_batch = {};
                data_hierarchy[element].forEach(data_element => {
                    if(data_hierarchy_batch[data_element["product_name"]] == undefined)
                    {
                        data_hierarchy_batch[data_element["product_name"]] = [];
                        data_hierarchy_batch[data_element["product_name"]].push(data_element);
                    }
                    else
                    {
                        data_hierarchy_batch[data_element["product_name"]].push(data_element);
                    }

                    if(data_hierarchy_date[data_element["date_sold"]] == undefined)
                    {
                        data_hierarchy_date[data_element["date_sold"]] = [];
                        data_hierarchy_date[data_element["date_sold"]].push(data_element);    
                    }
                    else
                    {
                        data_hierarchy_date[data_element["date_sold"]].push(data_element);         
                    }
                });
                data_hierarchy[element+"_date_wise_collection"] = data_hierarchy_date;
                data_hierarchy[element+"_product_wise_collection"] = data_hierarchy_batch;
            });
            data_hierarchy["locations"] = keys;
            console.log(data_hierarchy)
            this.setState({...this.state,
                total_godowns: keys.length,
                data_hierarchy_complete: data_hierarchy
            })
            this.forceUpdate();
        }); 
    }
    render()
    {
        return(
            <div>
                <Card style={{marginTop: '70',marginLeft:10,marginRight:10, minHeight: 600, maxHeight: 600}} elevation={4}>
                    <CardHeader
                        title={<Typography>{"Khurana Sales Godown Analytics"}</Typography>}
                        subheader= {"Total Godowns:  "+this.state.total_godowns}>
                    </CardHeader>
                    <CardContent>
                        <ScrollableTabsButtonAuto data={this.state.data_hierarchy_complete}/>
                    </CardContent>
                </Card>
            </div>
                );
    }

}


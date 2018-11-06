import React from 'react';
import LineChartComponent from './line_chart_component';
import Grid from '@material-ui/core/Grid'
import DynamicItemsList from './dynamic_items_list_view';
export default class LocationWiseContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            dataReceivedMain: {}
        }
    }
    componentWillReceiveProps(receivedProps)
    {
        console.log("main layout");
        console.log(receivedProps);
        this.setState({
            dataReceivedMain: receivedProps
        })
    }
    shouldComponentUpdate(receivedProps)
    {
        console.log("tab main container component update called");
        return true;
    }
    render()
    {
        return(
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={6}>
                        <DynamicItemsList dataTransferable={this.state.dataReceivedMain}/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChartComponent />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
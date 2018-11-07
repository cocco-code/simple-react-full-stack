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
            dataReceivedMain: {},
            dataFromChildRenderable: {}
        }
    }
    componentWillReceiveProps(receivedProps)
    {
        console.log("main layout");
        console.log(receivedProps);
        this.setState({...this.state,
            dataReceivedMain: receivedProps
        })
    }
    shouldComponentUpdate(receivedProps)
    {
        console.log("tab main container component update called");
        return true;
    }
    myCallback = (dataFromChild) => {
        console.log("callback called from child to parent")
        console.log(dataFromChild);
        this.setState({...this.state, dataFromChildRenderable: dataFromChild})
    }

    render()
    {
        return(
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={6}>
                        <DynamicItemsList dataTransferable={this.state.dataReceivedMain} callbackFromParent={this.myCallback}/>
                    </Grid>
                    <Grid item xs={6}>
                        <LineChartComponent dataToRender={this.state.dataFromChildRenderable}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
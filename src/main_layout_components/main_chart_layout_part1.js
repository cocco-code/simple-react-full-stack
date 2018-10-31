import React from 'react'
import BrandWiseSellingComponent from './brand_wise_selling_chart_component';
import { Grid } from '@material-ui/core';
import PromoterSellingComponent from './promoter_wise_selling_statistics';
class MainChartContainerPart1 extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {}; 
    }
    render(){
        return(
            <Grid container spacing={32} style={{marginTop: 20}}>
                <Grid item xs={6}>
                    <BrandWiseSellingComponent></BrandWiseSellingComponent>
                </Grid>
                <Grid item xs={6}>
                    <PromoterSellingComponent></PromoterSellingComponent>
                </Grid>
            </Grid>
        )
    }
}

export default MainChartContainerPart1
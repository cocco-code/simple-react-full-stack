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
            <div>
                <BrandWiseSellingComponent></BrandWiseSellingComponent>
                <PromoterSellingComponent></PromoterSellingComponent>
            </div>
        )
    }
}

export default MainChartContainerPart1
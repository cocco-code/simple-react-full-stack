import React from 'react';
import { Line as LineChart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
function chartData(receivedProps) {
    function dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.5)";}
        
    function poolColors(a) {
        var pool = [];
        var i = 0;
        for(i=0;i<a;i++){
            pool.push(dynamicColors());}
        return pool;
    }
    if(receivedProps.dataToRender.data === undefined)
    {
        return {
            labels: [],
            datasets: [
              {
                label: 'statistics',
                data: [],
                backgroundColor: poolColors(7)
              }
            ]
          }
    }
    else
    {
        const generatedLabel = receivedProps.dataToRender.chart_type === 'date' ? "Date Wise Sale Chart For This Location" : "Product Wise Sale Chart For This Location"
        if(receivedProps.dataToRender.chart_type === 'date')
        {
            const keys = Object.keys(receivedProps.dataToRender.data);  
            console.log("map data labels: ");
            console.log(keys);
            var values = [];
            keys.forEach(element => {
               values.push(receivedProps.dataToRender.data[element].length); 
            });
            return {
                labels: keys,
                datasets: [
                  {
                    label: generatedLabel,
                    data: values,
                    backgroundColor: poolColors(keys.length)
                  }
                ]
              }
        }
        else
        {
            var data_manipulated = {};
            receivedProps.dataToRender.data.forEach( element => {
                if(data_manipulated[element.product_name] === undefined)
                {
                    const new_object = {};
                    new_object["batches"] = [element.batch];
                    new_object["count"] = 1;
                    data_manipulated[element.product_name] =  new_object;
                }
                else
                {
                    const count = data_manipulated[element.product_name].count + 1;
                    data_manipulated[element.product_name].count = count;
                    data_manipulated[element.product_name].batches.push(element.batch);
                }
            });
            console.log("data generated: ");
            console.log(data_manipulated)
            const keys = Object.keys(data_manipulated);
            var dataElement = [];
            keys.forEach(element => {
                dataElement.push(data_manipulated[element].count)
            });
            return {
                labels: keys,
                datasets: [
                  {
                    label: generatedLabel,
                    data: dataElement,
                    backgroundColor: poolColors(keys.length)
                  }
                ]
              }
        }
    }
  }

  const styles = {
    graphContainer: {
        padding: '5px',
        float: 'center',
        marginTop: '20px'
    }
  }

  export default class LineChartComponent extends React.Component
  {
    constructor(props) {
        super(props)
        this.state = {
          data_received: {}, 
          chartdata: {}
        }
      }
    
      componentWillReceiveProps(receivedProps)
      {
        console.log("received props for map:");
        console.log(receivedProps)
        this.setState({
            ...this.state, data_received: receivedProps, chartdata: chartData(receivedProps)
        })
      }

      shouldComponentUpdate(receivedProps)
      {
        console.log("map component update called")
        return true;
      }
      render() {
        return (
          <div style={styles.graphContainer}>
                <Bar data={this.state.chartdata}
                  options={{ barThickness: 'flex',showAllTooltips: true,tooltips: {enabled: true, mode: 'index'},  scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            barPercentage: 0.5
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        },
                        label: true
                    }]
                },elements: {
                    rectangle: {
                      borderSkipped: 'left',
                    }
                  },maintainAspectRatio: true, responsive: true,title: {display: true, text: "Selling Statistics"}, }}>
                </Bar>
               
          </div>
        )
      }
  }

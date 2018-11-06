import React from 'react';
import { Line as LineChart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2';
function chartData() {
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

    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: poolColors(7)
        }
      ]
    }
  }

  const styles = {
    graphContainer: {
        padding: '15px',
        marginTop: '20px'
    }
  }

  export default class LineChartComponent extends React.Component
  {
    constructor(props) {
        super(props)
        this.state = {
          chartdata: chartData()
        }
      }
    
      render() {
        return (
          <div style={styles.graphContainer}>
                <Bar data={this.state.chartdata}
                  options={{maintainAspectRatio: true, responsive: true,title: {display: true, text: "Selling Statistics"}, }}>
                </Bar>
               
          </div>
        )
      }
  }

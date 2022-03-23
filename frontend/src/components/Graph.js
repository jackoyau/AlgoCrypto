import { CrosshairMode , createChart } from "lightweight-charts";
import React, { useEffect } from 'react';
import axios from 'axios'


const  Graph = ({ updateCandle }) => {
  let chartRef = React.useRef(null);
  useEffect(()=> {
      const chart = createChart(document.getElementById('mainChart'), {
        width: 600,
        height: 300,
        layout: {
          backgroundColor: '#000000',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
          timeVisible: true,
          secondsVisible: false,
        },})
      
      if(chartRef.current){
        prepareChart(chart)
        chartRef.current = chart
      }
    
  
  
  }, [])
  
  useEffect(()=> {
    if(chartRef.current){
     
      updateChart(chartRef.current)
     
    }
    
  
  }, [updateCandle])


  const updateChart = async(chart) => {
    
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00ff00',
      downColor: '#ff0000', 
      borderDownColor: '#ff0000',
      borderUpColor: '#00ff00',
      wickDownColor: '#ff0000',
      wickUpColor: '#00ff00',
    })
    candleSeries.update({
      time: updateCandle.time,
      open: updateCandle.open,
      high: updateCandle.high,
      low: updateCandle.low,
      close: updateCandle.close,
    })
    // console.log(updateCandle)

}


  
  const prepareChart = async(chart) => {
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00ff00',
      downColor: '#ff0000', 
      borderDownColor: '#ff0000',
      borderUpColor: '#00ff00',
      wickDownColor: '#ff0000',
      wickUpColor: '#00ff00',
    })
    const  { data }  = await axios.get('/api/chart')
    console.log(data)

    candleSeries.setData(data);


}

  return <div id="mainChart" ref={chartRef} />;
}

export default Graph;

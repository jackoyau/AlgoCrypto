import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'


const HomeScreen = () => {
  const[stockPrice, setStockPrice] = useState()
  const[stockPercentChange, setStockPercentChange] = useState()
  const[ws, setWs] = useState(null)
  
  const connectWebSocket = () => {
    setWs(io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    }))
    
  }
  const initWebSocket = () => {
    ws.on('getMessage', message => {
        console.log(message)
        const { close, percentChange } = message
        setStockPrice(close)
        setStockPercentChange(percentChange)
    })
  }


  useEffect(()=>{
    // const intervalId = setInterval(() => {
    //   const getData = async ()=>{
    //     const { data } = await axios.get('/api/stocks')
    //     setStocks(data)
    //   }
    //   getData()
    // }, 1000)
    // return () => clearInterval(intervalId);
    if(ws){ 
      console.log('client success connect!')
      initWebSocket()
    }
  },[ws])
  
  return (
    <>
    <h1>ETHUSDT: {stockPrice} {stockPercentChange>'0' ? <span style={{color: 'green'}}>{stockPercentChange}%</span> 
                                : stockPercentChange<'0' ?<span style={{color: 'red'}}>{stockPercentChange}%</span>
                                : stockPercentChange==='0' ?<span style={{color: 'grey'}}>{stockPercentChange}%</span>
                              : <span></span>}
    </h1>
    <input type='button' value='connect' onClick={connectWebSocket} />
    <input type='button' value='sendMessage' onClick={sendMessage} />
    </>
  )
}

export default HomeScreen
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { Form, Button, Row, Col, Table, Card } from 'react-bootstrap'
import Graph from '../components/Graph'


const HomeScreen = () => {
  const[stockPrice, setStockPrice] = useState()
  const[stockPercentChange, setStockPercentChange] = useState()
  const[stockSymbol, setStockSymbol] = useState()
  const[updateCandle, setUpdateCandle] = useState({})
 
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
      const { symbol, close, percentChange } = message
        setStockSymbol(symbol)
        // setStockPrice(close)
        setStockPercentChange(percentChange)
 
    })
    ws.on('updateCandles', message => {
      setUpdateCandle(message)
      setStockPrice(parseFloat(message.close))
    })
  }

  //componentDidMount
  useEffect(()=>{
    connectWebSocket()
  },[])


  useEffect(()=>{
    
    if(ws){ 
      console.log('client success connect!')
      initWebSocket()
    }
  },[ws])


  
  return (
    <>
      <h4>{stockSymbol} {stockPrice} {stockPercentChange>'0' ? <span style={{color: 'green'}}>{stockPercentChange}%</span> 
                                : stockPercentChange<'0' ?<span style={{color: 'red'}}>{stockPercentChange}%</span>
                                : stockPercentChange==='0' ?<span style={{color: 'grey'}}>{stockPercentChange}%</span>
                              : <span></span>}</h4>
      <Graph  updateCandle={updateCandle}/>
      
      {/* <input type='button' value='connect' onClick={connectWebSocket} /> */}
    </>
  )
}

export default HomeScreen
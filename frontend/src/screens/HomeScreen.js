import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'


const HomeScreen = () => {
  const[stocks, setStocks] = useState()
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
  })
}
const sendMessage = () => {
  ws.emit('getMessage', {name: 'jacko'})
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
    {/* <h1>{stocks}</h1> */}
    <input type='button' value='connect' onClick={connectWebSocket} />
    <input type='button' value='sendMessage' onClick={sendMessage} />
    </>
  )
}

export default HomeScreen
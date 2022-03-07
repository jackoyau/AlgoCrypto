import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HomeScreen = () => {
  const[stocks, setStocks] = useState()
  
  useEffect(()=>{
    const intervalId = setInterval(() => {
      const getData = async ()=>{
        const { data } = await axios.get('/api/stocks')
        console.log (data)
        setStocks(data)
      }
      getData()
    }, 1000)
    return () => clearInterval(intervalId);
  },[])
  
  return (
    <h1>{stocks}</h1>
  )
}

export default HomeScreen
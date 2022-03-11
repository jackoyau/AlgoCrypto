import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import Binance from 'node-binance-api'
import stockRoutes from './routes/stockRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const binance = new Binance().options({
    APIKEY: process.env.KEY,
    APISECRET: process.env.SECRET,
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/stocks', stockRoutes)

const server = http.createServer()
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})   
io.on('connection', socket => {
      console.log('success connect!') 
      socket.on('getMessage', message => {
        console.log('server recieved client msg')
        socket.emit('getMessage', message)
        binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
            let tick = binance.last(chart)
            const last = chart[tick].close
            socket.emit('getMessage',chart)
            // Optionally convert 'chart' object to array:
            // let ohlc = binance.ohlc(chart);
            // console.info(symbol, ohlc);
            socket.emit('getMessage', symbol+" last price: "+last)
        })
        binance.websockets.prevDay('BNBBTC', (error, response) => {
            socket.emit('getMessage', response)
          });
    })
})
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode and socket.io on port ${PORT}`))




// const PORT = process.env.PORT || 5000
// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
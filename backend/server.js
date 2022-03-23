import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import Binance from 'node-binance-api'
import chartRoutes from './routes/chartRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const binance = new Binance().options({
    APIKEY: process.env.KEY,
    APISECRET: process.env.SECRET,
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/chart', chartRoutes)

const server = http.createServer(app)
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
      
        // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
        binance.websockets.candlesticks(['BTCUSDT'], "5m", (candlesticks) => {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            let time = (Math.floor(eventTime/(10**5)))*100
            while (time%3 !=0){
                time = time-100
            }
            let updateCandles = {
                "time": time,
                "open": open,
                "high": high,   
                "low": low,
                "close": close,
            }
            socket.emit('updateCandles',updateCandles)
        });
       
        
        let prevPrice = 0

        binance.websockets.prevDay('BTCUSDT', (error, response) => {
            
            response.close =parseFloat(response.close)
            if(response.close>=1){
                response.close = response.close.toFixed(2)
            }
            if(response.close !== prevPrice){
                response.percentChange=(Math.round(response.percentChange*100)/100).toFixed(2)
                socket.emit('getMessage', response) 
            }
            prevPrice = response.close
               
        })
         
        
    // })
})
server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode and socket.io on port ${PORT}`))





// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
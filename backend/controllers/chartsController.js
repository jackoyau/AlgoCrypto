import asyncHandler from 'express-async-handler'
import Binance from 'node-binance-api'
import dotenv from 'dotenv'

dotenv.config()

const binance = new Binance().options({
    APIKEY: process.env.KEY,
    APISECRET: process.env.SECRET,
})

const getCharts = asyncHandler(async(req,res)=>{
    
    await binance.candlesticks("BTCUSDT", "5m", (error, ticks, symbol) => { 
        const historyData = []
        for(const tick of ticks){
            var [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = tick
           historyData.push({
                "time":time/1000,
                "open":open,
                "high":high,
                "low":low,
                "close":close,
            })
        }
        res.json(historyData)
   
    }, {limit: 500, endTime: Date.now()})
})
   

export { getCharts }
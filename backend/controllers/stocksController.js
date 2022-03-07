import asyncHandler from 'express-async-handler'
import Binance from 'node-binance-api'
import dotenv from 'dotenv'

dotenv.config()

const binance = new Binance().options({
    APIKEY: process.env.KEY,
    APISECRET: process.env.SECRET,
})

const getStocks = asyncHandler(async(req,res)=>{
    
    const ticker = await binance.prices()
    res.json( `Price of BNB: ${ticker.BNBUSDT}`)
//     binance.websockets.candlesticks(['BNBBTC'], "1m", (candlesticks) => {
//   let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
//   let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
  
//   res.json("open: "+open);
 
// });
})

export { getStocks }
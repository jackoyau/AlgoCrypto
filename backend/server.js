import express from 'express'
import dotenv from 'dotenv'

import stockRoutes from './routes/stockRoutes.js'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/stocks', stockRoutes)




const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
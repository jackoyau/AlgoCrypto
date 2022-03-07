import express from 'express'
const router = express.Router()
import { getStocks } from '../controllers/stocksController.js'

router.route('/').get(getStocks)

export default router
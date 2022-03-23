import express from 'express'
const router = express.Router()
import { getCharts } from '../controllers/chartsController.js'

router.route('/').get(getCharts)

export default router
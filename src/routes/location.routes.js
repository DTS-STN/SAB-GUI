import { Router } from 'express'
import { logError, logDebug } from '../utils/logger'
import http from 'http'

const apiHost = process.env.CONNECTION_STRING

const router = Router()

router
  .get('/locations/:province', (req, res) => {
    let data = ''
    let province = req.params.province
    http
      .get(`${apiHost}/locationsbyprov/${province}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API in locations/province: ' +
            err.message,
        )
        res.status(503).send()
      })
  })
  .get('/locations/:province/:city', (req, res) => {
    let data = ''
    let province = req.params.province
    let city = req.params.city || ''
    http
      .get(`${apiHost}/locationsbyprov/${province}/${city}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API in locations/province/city: ' +
            err.message,
        )
        res.status(503).send()
      })
  })

export default router

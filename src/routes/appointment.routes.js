import { Router } from 'express'
import { logError, logDebug } from '../utils/logger'
import http from 'http'

const apiHost = process.env.CONNECTION_STRING

const router = Router()

router
  .get('/appointments/:locationID', (req, res) => {
    let data = ''
    let locationID = req.params.locationID
    let day = req.query.day
    http
      .get(`${apiHost}/appointments/${locationID}?day=${day}`, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', chunk => {
          data += chunk
          res.status(200).send(data)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/locationID/city:  ' +
            err.message,
        )
        res.status(503).send()
      })
  })
  .post('/appointments/temp', (req, res) => {
    let data = JSON.stringify(req.body)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }
    let postReq = http
      .request(`${apiHost}/appointments/temp`, options, resp => {
        logDebug(`STATUS: ${resp.statusCode}`)
        logDebug(`HEADERS: ${JSON.stringify(resp.headers)}`)
        resp.on('data', respData => {
          res.status(200).send(respData)
        })
      })
      .on('error', err => {
        logError(
          'Something went wrong when calling the API appointments/temp:  ' +
            err.message,
        )
        res.status(503).send()
      })
    postReq.write(data)
    postReq.end()
  })

export default router

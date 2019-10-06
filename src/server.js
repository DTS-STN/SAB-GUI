import express from 'express'
import cookieParser from 'cookie-parser'
import { getStoreCookie } from './cookies'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import routes from './routes'
import Document from './Document'
import path from 'path'
import { renderStylesToString } from 'emotion-server'
import bodyParser from 'body-parser'
import {
  getPrimarySubdomain,
  ensureLocation,
  setRavenContext,
  cspConfig,
} from './utils/serverUtils'
import gitHash from './utils/gitHash'
import emailRoutes from './routes/email.routes'
import appointmentRoutes from './routes/appointment.routes'
import locationRoutes from './routes/location.routes'

checkEnvironmentVariables()

// eslint-disable-next-line security/detect-non-literal-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST ||
  path.join(process.cwd(), 'build', 'assets.json'))

const server = express()
const helmet = require('helmet')

server
  .use(helmet()) // sets security-focused headers: https://helmetjs.github.io/
  .use(helmet.frameguard({ action: 'deny' })) // Sets "X-Frame-Options: DENY".
  .use(helmet.contentSecurityPolicy({ directives: cspConfig }))
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || './public'))
  .use(getPrimarySubdomain)
  .use(setRavenContext)
  .use(ensureLocation)
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(emailRoutes)
  .use(appointmentRoutes)
  .use(locationRoutes)
  .get('/clear', (req, res) => {
    let language = getStoreCookie(req.cookies, 'language') || 'en'
    res.clearCookie('store')
    res.redirect(`/cancel?language=${language}`)
  })
  .all('/*', async (req, res) => {
    const customRenderer = node => ({
      gitHashString: gitHash(),
      path: req.url,
      html: renderStylesToString(renderToString(node)),
    })
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document,
      })

      return res.locals.redirect
        ? res.redirect(res.locals.redirect)
        : res.send(html)
    } catch (error) {
      console.log(error.message, error.stack) // eslint-disable-line no-console
      res.redirect('/error')
      return
    }
  })

export default server

function checkEnvironmentVariables() {
  if (process.env.SKIP_SECRET_CHECK !== 'TRUE') {
    const key = process.env.NOTIFICATION_API_KEY
    if (key === '' || typeof key === 'undefined') {
      throw 'NOTIFICATION_API_KEY environment variable not found'
    }
  }
  const baseUrl = process.env.NOTIFICATION_API_BASE_URL
  if (baseUrl === '' || typeof baseUrl === 'undefined') {
    throw 'NOTIFICATION_API_BASE_URL environment variable not found'
  }
}

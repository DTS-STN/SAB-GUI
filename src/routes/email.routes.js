import { Router } from 'express'
import { handleSubmitEmail } from '../email/handleSubmitEmail'

const router = Router()

router.post('/submit', handleSubmitEmail)

export default router

import cors from 'cors'
import express from 'express'

import errorHandler from './middlewares/errorHandler.js'
import albumsRoutes from './routes/albumsRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/albums', albumsRoutes)

app.use(errorHandler)

export default app

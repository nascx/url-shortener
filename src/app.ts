import express, { json } from 'express'
import cors from 'cors'
import shortURLRoutes from './routes/shorURLRoutes'

const app = express()

app.use(json())
app.use(cors())


app.use('/', shortURLRoutes)

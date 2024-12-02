import express, { json } from 'express'
import cors from 'cors'
import shortURLRoutes from './routes/shorURLRoutes'

const app = express()

app.use(json())
app.use(cors())

app.use('/url', shortURLRoutes)

app.listen(3000, () => {
    console.log('Listening in port: 3000')
})
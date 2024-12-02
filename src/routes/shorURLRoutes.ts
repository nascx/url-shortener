import express from 'express'
import { UserController } from '../controller/UserController'
import { AppServices } from '../services/AppServices'

const shortURLRoutes = express.Router()

shortURLRoutes.post('/create', AppServices.urlValidate, UserController.addShorURL)

export default shortURLRoutes
import express from 'express'
import { GoogleLogin, Login,Logout,SignUp } from '../controllers/Auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'

const AuthRoute = express.Router()

AuthRoute.post('/signup', SignUp)
AuthRoute.post('/login',Login)
AuthRoute.post('/google-login', GoogleLogin)
AuthRoute.post('/logout', authenticate, Logout)

export default AuthRoute
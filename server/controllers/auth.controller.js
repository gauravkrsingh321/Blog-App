import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const SignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
         
        if(!name || !email || !password) {
          return next(handleError(400, 'Please Enter All Details.')) 
        }
        
        if(password.length < 8) {
          return next(handleError(400, 'Password must be 8 characters long')) 
        }

        const checkuser = await User.findOne({ email })
        if(checkuser) {
            // user already registered 
           return next(handleError(409, 'User already registered.'))
        }

        const hashedPassword = await bcryptjs.hash(password,10)
        // register user  
        const user = new User({
            name, email, password: hashedPassword
        })

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Registration successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
           return next(handleError(404, 'Invalid login credentials.'))
        }
        const hashedPassword = user.password

        const comparePassword = await bcryptjs.compare(password, hashedPassword)
        if (!comparePassword) {
           return next(handleError(404, 'Invalid login credentials.'))
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET,{
            expiresIn:"7h"
        })


        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body
       
         if (!email || !name) {
      return next(handleError(400, 'Missing Google User credentials.'));
    }
        let user
        user = await User.findOne({ email })
        if (!user) {
            //  create new user 
            const password = Math.random().toString()
            const hashedPassword = await bcryptjs.hash(password, 10);
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            })
            user = await newUser.save()
        }

        //We generate a JWT in Google login so that your backend can manage user sessions, protect routes, and control access — independent of Google.
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)


        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}



export const Logout = async (req, res, next) => {
    try {

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        res.status(200).json({
            success: true,
            message: 'Logout successful.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
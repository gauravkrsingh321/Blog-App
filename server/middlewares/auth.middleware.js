import jwt from 'jsonwebtoken'
export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            return next(401, 'Unauthorized - Token Missing')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken //attach user info from token to request
        next();
    } 
    catch (error) {
        next(500, error.message)
    }
}
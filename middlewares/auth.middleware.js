import jwt from 'jsonwebtoken'
import JWT_SECRET from '../config/env.js'
const authorize = async (req, res, next)=>{
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const decoded = jwt.verify(token, JWT_SECRET)


    } catch (error) {
        res.status(401).json({message: 'Unauthorize', error: error.message})
    }
}
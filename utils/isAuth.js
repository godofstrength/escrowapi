const jwt = require('jsonwebtoken');
require('dotenv').config();
const {ACCESS_TOKEN_SECRET} = process.env;

const isAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    if(typeof token !== 'undefined'){
        req.token = token
        next();
    }else{
        return res.status(403).json({
            message: 'failed to authenticate token',
            success: false
        })
    }
     
}
const verifyToken = (req, res, next) =>{
        // verify the token
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) =>{
            if (err) {
              res.status(401).json({
                error: 'Unauthorized'
              });
            } else{
            req.user = authData;
            next()
            }
          })
}
module.exports = {
    isAuth,
    verifyToken
}
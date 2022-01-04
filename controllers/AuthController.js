require('dotenv').config();
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
const User = require('../models/').User;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const {sendRefreshToken} = require('../utils/Token')



const AuthController = {
   register (req, res){
    const {email, password, password_confirm} = req.body;
    let errors = [];
      //  check if user already exist
        User.findOne({where: {email: email}})
        .then(user => {
            if(user){
                // user exist
                errors.push({msg: 'Email is already registered'})
               res.json({
                   statusCode: 400,
                   error: errors,
                   email: email
               })
            }else{
                const newUser = User.build({
                    email : email,
                    password: password,
                });
                // hash password
                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        res.json({
                            message: 'Registration successful',
                            user: user
                        })
                    })
                    .catch(err => console.log(err));
                }))
            }
        })
    },

 Login(req, res, next){
        const {email, password} = req.body;
        let errors = [];
            User.findOne({where: {email: email}}).then(user => {
                if(user){
                    bcrypt.compare(password, user.password)
                    .then(result => {
                        if(!result){
                            res.json({
                                message: 'incorrect login credentials'
                            })
                        }else{
                            const accessToken =  jwt.sign({user: user}, ACCESS_TOKEN_SECRET, {
                                expiresIn: '15m'
                            })
                            const refreshToken = jwt.sign({user: user}, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
                            // send message, user, Refreshtoken as cookie and accesstoken as response
                            sendRefreshToken(res, refreshToken);
                            if(!accessToken || !refreshToken){
                                res.json({
                                    message: 'invalid Token'
                                })
                            }else{
                                res.json({
                                    message: 'Login successful',
                                    user: user,
                                    accesstoken: accessToken
                                })
                            }
                         
                        }
                    })
                    .catch(err => res.json({error: err.message}))
                }else{
                    res.json({
                        message: 'That email is not registered'
                    })
                }
            })
            .catch(err => {
                res.json({error: err.message})
            })
},

    logout (req, res) {
        res.clearCookie('refreshtoken');
        res.json({
            message: 'Logged out'
        })
    }
}

module.exports = AuthController;
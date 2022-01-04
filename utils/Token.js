const jwt = require('jsonwebtoken');


const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'

    });
}

module.exports = {
    sendRefreshToken,
}
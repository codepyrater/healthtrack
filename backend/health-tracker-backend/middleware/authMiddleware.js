const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // "Bearer TOKEN_HERE"

    if (token == null) {
        return res.sendStatus(401);  // if there's no token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);  // if the token has expired or is invalid
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };

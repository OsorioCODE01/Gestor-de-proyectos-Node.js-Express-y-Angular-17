const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(playload) {
    return jwt.sign(playload, process.env.JWT_SECRET, { expiresIn: '7d' });
}
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    verifyToken};
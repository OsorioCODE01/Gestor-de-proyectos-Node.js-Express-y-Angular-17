const jwt = require('../wrappers/jwt');
const userModel = require('../models/userModel');

function readCookie(req) {
    const cookie = req.headers.cookie;
    if (cookie) {
        const token = cookie.split(";").find(cookie => cookie.startsWith('jwt=')).slice(4);
        return jwt.verifyToken(token);
    }
    return null;
}

function adminAcces(req, res, next) {
    try {
        const token = readCookie(req);
        if (token == null){
             return res.status(401).send({ message: 'Sesion no iniciada' });
        }
        const user = new userModel(token.user_id);      
        user.findUserById().then(result => {

            if (!result[0].data.accesLevel){
                res.status(401).send({ message: 'Acceso restrigido, nivel no valido' });           
            }
            else{
                next();
            }
        });
    } catch (error) {
        res.status(401).send({ message: 'Acceso restringido' });
    }
}

function userAccess(req, res, next) {
    try {
        const token = readCookie(req);
        if (token == null){
             return res.status(401).send({ message: 'Sesion no iniciada' });
        }
        
        next();

    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
    
}

function alreadyLogin(req, res, next) {
    try {
        const token = readCookie(req);
        if(token){
           return res.status(401).send({ message: 'Ya iniciaste sesion' });
        
        }      
        next();

    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
    
}

module.exports = {
    adminAcces,
    userAccess,
    alreadyLogin
}
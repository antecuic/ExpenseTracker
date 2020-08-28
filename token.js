function verifyToken(req, res, next) {

    //get the auth header value
    const bearerHeader = req.headers['authorization']


    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]

        //set token
        req.token = bearerToken;
        next();
    } else {
        //forbidden  
        res.sendStatus(403)
    }

}
module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const sendResponse=require("../utils/sendResponse")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token, "Secret");
        req.user=decoded.userId
        req.name=decoded.name
        next();
    } catch (error) {
        return sendResponse({
            res,
            statusCode: 401,
            message: "Authentication failed!" ,
            error:error
        });
    }
};
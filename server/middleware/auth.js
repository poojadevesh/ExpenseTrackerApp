const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");



//-----------------------------authentication-----------------------------------
const authentication = async (req, res, next) => {
    try {
        const token = req.headers["x-api-key"];
        
        if (!token)
            return res.status(400).send({ status: false, msg: "Token must be present" });
        
        const decodedToken = jwt.verify(token, "Expensetracker");

        if (!decodedToken)
            return res.status(403).send({ status: false, msg: "Invalid token" });

        const user = await usermodel.findById(decodedToken.userId);
       

        if (!user)
            return res.status(403).send({ status: false, msg: "Unauthorized user" });

        req.user = user;

        next();
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}




module.exports = { authentication  };

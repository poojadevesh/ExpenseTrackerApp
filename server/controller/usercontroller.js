const bcrypt = require("bcrypt");
const usermodel = require("../models/usermodel");
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        
        if (!req.body || Object.keys(req.body).length > 3) {
            return res.status(400).send({ status: false, msg: "Invalid input" });
        }

        if (!req.body) {
            return res.status(400).send({ status: false, msg: "Please fill data" });
        }

        if (!username) {
            return res.status(400).send({ status: false, msg: 'Please fill fname' });
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: 'Please fill email' });
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: 'Please fill password' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        req.body.password = hashPassword

        const newUser = await usermodel.create(req.body);

        return res.status(201).send({ status: true, data: newUser });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!req.body || Object.keys(req.body).length > 2) {
            return res.status(400).send({ status: false, msg: "Invalid input" });
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: 'Please fill email' });
        }

        if (!password) {
            return res.status(400).send({ status: false,  msg: 'Please fill password' });
        }

        const existUser = await usermodel.findOne({ email });

        if (!existUser) {
            return res.status(401).send({ status: false, message: "Register yourself" });
        }

        const matchPass = await bcrypt.compare(password, existUser.password);

        if (!matchPass) {
            return res.status(400).send({ status: false, message: "You Entered Wrong password" });
        }

        const token = jwt.sign({ userId: existUser._id }, "Expensetracker");
        res.setHeader("x-api-key", token);
        return res.status(200).send({ status: true, token });
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = { createUser, userLogin };

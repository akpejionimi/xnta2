const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { Operators } = require("../models/operatorModel");

exports.postLogin = (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).json({ msg: "All Fields are required" })
    } else {
        Operators.findOne({
            where: { userName }
        })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ msg: "Invalid Username" })
                }
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) {
                            return res.status(400).json({ msg: "Invalid Password" })
                        }
                        jwt.sign(
                            { userId: user.id },
                            process.env.AUTH_SECRET_KEY,
                            { expireIn: "1hr" },
                            (err, token) => {
                                res.json({
                                    token,
                                    user: {
                                        operatorId: user.id,
                                        userName: user.userName,
                                        operatorLevel: user.operatorLevel
                                    }
                                })
                            });
                    })
                    .catch(err => {
                        next(err)
                    })
            }).catch(err => next(err))
    }
}


exports.getCurrentUser = (req, res, next) => {
    const userId = req.userId;
    Operators.findByPk(userId, {
        attributes: { exclude: ["password", "updatedAt"] }
    })
        .then(user => {
            if (!user) {
                const error = new Error("User Not Found");
                error.statusCode = 404;
                next(error);
            } else {
                res.json(user);
            }
        })
        .catch(error => next(error));
};
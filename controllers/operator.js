const { Operators } = require('../models/operatorModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getOperator = (req, res, next) => {
    Operators.findAll()
        .then((operators) => {
            // console.log(operators);
            res.json(operators)
        })
        .catch(err => res.json({
            success: false
        }))
}

exports.postAddOperator = (req, res, next) => {
    const { operatorId,userName, password, operatorLevel } = req.body;
    if ( !userName  || !password || !operatorLevel) {
        res.status(400).json({ msg: 'All fields are required' });

    } else {
        Operators.findOne({
            where: {
                userName
            }
        }).then(operator => {
            if (operator) {
                return res.status(400).json({ msg: "User already exists" })
            } else {
                let hashedPassword;
            try {
                const salt = bcrypt.genSaltSync(10);
                hashedPassword = bcrypt.hashSync(password, salt);
            } catch (error) {
                throw error;
            }
            Operators.create({
                operatorId,
                userName,
                password: hashedPassword,
                operatorLevel
            }).then(operator => {
                jwt.sign(
                    { OperatorId: operator.id },
                    process.env.AUTH_SECRET_KEY,
                    { expiresIn: "1h" },
                    (err, token) => {
                        res.json({
                            token,
                            operator: {
                                operatorId: operator.id,
                                userName: operator.userName,
                                operatorLevel: operator.operatorLevel
                            }
                        })
                    });
            }).catch(err => res.status(500).json({ msg: "An error occured", error: err }))
            }
        })
            .catch((err) => res.status(500).json({ msg: err }))
    }
}

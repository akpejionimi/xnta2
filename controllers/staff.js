const { Staff } = require('../models/operatorModel');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.getAllStaff = (req, res) => {
    // GET ALL Staff IN DATABASE
    Staff.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
        .then(staffs => {
            console.log(staffs);
            res.json(staffs);
        })
        .catch(err => console.log(err))
}


exports.getStaffById = (req, res) => {
    const staffId = req.params.staffId;

    Staff.findOne({
        where: {
            staffId: staffId
        },
        include: [
            {
                all: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
        .then(staff => {
            if (!staff) {
                res.status(404).json({ success: false, msg: "staff not Found" });
            } else {
                res.json(staff);
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                msg: "Something went wrong while getting the staff"
            })
        );
};



exports.postAddStaff = (req, res, next) => {
    const { staffId, fullName, email, department, phoneNo, entryDate, dateEmployed, gender, status } = req.body;
    if (!fullName || !department || !phoneNo) {
        res.status(400).json({ msg: 'All fields are required' });

    } else {
        Staff.findOne({
            where: {
                phoneNo
            }
        }).then(staff => {
            if (staff) {
                return res.status(400).json({ msg: "staff already exists" })
            }
            else {
                Staff.create({
                    staffId,
                    fullName,
                    email,
                    phoneNo,
                    status,
                    gender,
                    department,
                    entryDate,
                    dateEmployed

                })
                    .then((staff => {
                        res.json({
                            staff,
                            success: true
                        });
                    }))
                    .catch((err) => res.json({
                        msg: "something went wrong",
                        Error: err
                    }));
            }
        })
    }
}

exports.postUpdateStaff = (req, res, next) => {
    const { fullName, email, department, phoneNo, entryDate, dateEmployed, gender, status } = req.body;
    const staffId = req.params.staffId;
    Staff.findByPk(staffId)
        .then((staff) => {
            staff.update({
                fullName,
                email,
                phoneNo,
                status,
                gender,
                department,
                entryDate,
                dateEmployed
            })
                .then(staff => {
                    res.json(staff);
                }).catch((err) => next(err))

        })
        .catch(err =>
            res
                .status(500)
                .json({ msg: "Staff does not exist", error: err })
        );
};
exports.deleteStaff = (req, res) => {
    const staffId = req.params.staffId;
    Staff.findByPk(staffId)
        .then(staff => {
            staff
                .destroy()
                .then(() => {
                    console.log(res);
                    res.json({ success: true });
                })
                .catch(err => res.json({ success: false }));
        }
        )
        .catch(err =>
            res.json({ success: false, msg: "This staff doesnt exists" })
        );
};
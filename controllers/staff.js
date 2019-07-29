const { Staff } = require('../models/operatorModel');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.getStaff = (req, res, next) => {
    Staff.findAll()
        .then((staff) => {
            // console.log(staff);
            res.json(staff)
        })
        .catch(err => res.json({
            success: false
        }))
}
//Get single staff by its id

// exports.getStaffById = (req, res, next) => {
//     const staffId = req.params.staffId;
//     Staff.findByPk(staffId)
//         .then(staff => {
//             if (!staff) {
//                 res.status(404).json({ success: false, msg: "staff not Found" });
//             } else {
//                 res.json(staff);
//             }
//         })
//         .catch(err => next(err));
// };
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
    const { staffId, fullName, email, department, phoneNo, entryDate, dateEmployed } = req.body;
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

    exports.postUpdateStaff=(req,res,next)=>{
        const { fullName, email, department, phoneNo, entryDate, dateEmployed } = req.body;
        const staffId = req.params.staffId;
        Staff.findByPk(staffId)
            .then((staff)=>{
                    staff.update({
                        fullName,
                        email,
                        phoneNo,
                        department,
                        entryDate,
                        dateEmployed
                    })
                    .then(staff => {
                        res.json(staff);
                    }).catch((err)=>next(err))
                
            })
            .catch(err =>
                res
                    .status(500)
                    .json({ msg: "Staff does not exist", error: err })
            );
    };

    // exports.postAddStaff = (req, res, next) => {
    //     const { staffId, fullName, password, email, department, phoneNo } = req.body;
    //     if (!fullName || !password || !department || !phoneNo) {
    //         res.status(400).json({ msg: 'All fields are required' });

    //     } else {
    //         Staff.findOne({
    //             where: {
    //                 phoneNo
    //             }
    //         }).then(staff => {
    //             if (staff) {
    //                 return res.status(400).json({ msg: "staff already exists" })
    //             } else {
    //                 let hashedPassword;
    //                 try {
    //                     const salt = bcrypt.genSaltSync(10);
    //                     hashedPassword = bcrypt.hashSync(password, salt);
    //                 } catch (error) {
    //                     throw error;
    //                 }
    //                 Staff.create({
    //                     staffId,
    //                     fullName,
    //                     phoneNo,
    //                     password: hashedPassword,
    //                     department,
    //                     email
    //                 }).then(staff => {
    //                     jwt.sign(
    //                         { StaffId: saff.id },
    //                         process.env.AUTH_SECRET_KEY,
    //                         { expiresIn: "1h" },
    //                         (err, token) => {
    //                             res.json({
    //                                 token,
    //                                 staff: {
    //                                     staffId: staff.staffId,
    //                                     fullName: staff.fullName,
    //                                     department: staff.department,
    //                                     email: staff.email
    //                                 }
    //                             })
    //                         });
    //                 }).catch(err => res.status(500).json({ msg: "An error occured", error: err }))
    //             }
    //         })
    //             .catch((err) => res.status(500).json({ msg: err }))
    //     }
    // }
}
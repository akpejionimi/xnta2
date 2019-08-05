const { Customer } = require("../models/operatorModel");

exports.getAllCustomer = (req, res) => {
    // GET ALL Customer IN DATABASE
    Customer.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
        .then(customers => {
            // console.log(customers);
            res.json(customers);
        })
        .catch(err => console.log(err))
}

//Create customers
exports.postAddCustomers = (req, res, next) => {
    let accNum;
    function random_num() { return Math.random().toString().slice(2, 11); }
    accNum = random_num();

    const { fullName, email, phoneNo ,registrationDate,entryDate,status,gender} = req.body;
    if (!fullName || !phoneNo) {
        res.status(400).json({ msg: 'All fields are required' });
    } else {
        Customer.create({
            fullName,
            email,
            phoneNo,
            accountNo: accNum,
            entryDate,
            registrationDate,
            status,
            gender

        })
            .then((customer => {
                // console.log(customer);       
                res.json(customer);
            }))
            .catch((err) => res.status(400).send({
                msg: "something went wrong",
                Error: err
            }));
    }

}

exports.getCustomerById = (req, res) => {
    const customerId = req.params.customerId;

    Customer.findOne({
        where: {
            customerId: customerId
        },
        include: [
            {
                all: true,
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
        .then(customer => {
            if (!customer) {
                res.status(404).json({ success: false, msg: "customer not Found" });
            } else {
                res.json(customer);
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                msg: "Something went wrong while getting the customer"
            })
        );
};

exports.postUpdateCustomer=(req,res,next)=>{
	const { fullName, email, phoneNo ,registrationDate,entryDate, status, gender } = req.body;
	const customerId = req.params.customerId;
	Customer.findByPk(customerId)
		.then((customer)=>{
				customer.update({
                    fullName,
                    email,
                    phoneNo,
                    gender,
                    entryDate,
                    registrationDate,
                    status
				})
				.then(customer => {
					res.json(customer);
				}).catch((err)=>next(err))
			
		})
		.catch(err =>
			res
				.status(500)
				.json({ msg: "customer does not exist", error: err })
		);
};

exports.deleteCustomer = (req, res) => {
	const customerId = req.params.customerId;
	Customer.findByPk(customerId)
		.then(customer => {
				customer
					.destroy()
					.then(() => {
						res.json({ success: true });
					})
					.catch(err => res.json({ success: false }));
			}
		)
		.catch(err =>
			res.json({ success: false, message: "This customer doesnt exists" })
		);
};

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

const Sequelize = require("sequelize");

const { Customer, ProductSubscription, 
	Savings_Products, 
	Product_Payment 
} = require("../models/operatorModel")

// Get all Payments
exports.getAllPayments = (req, res, next) => {
	Product_Payment.findAll({
		include: [
			{
				model: ProductSubscription,
				all: true,
				attributes: { exclude: ["paymentId", "createdAt", "updatedAt", "paymentValue","authorised"] },
				include: [
					{
						model: Savings_Products,
						all: true,
						attributes: { exclude: ["productId", "createdAt", "updatedAt", "moneyValue", "productDuration"] }
					},
					{
						model: Customer,
						all: true,
						attributes: { exclude: ["customerId", "createdAt", "updatedAt", "registrationDate", "email", "accountNo", "entryDate", "status", "gender", "phoneNo"] }
					}
				]
			}
		]
	})
		.then(payments => {
			res.json(payments);
		})
		.catch(err => next(err));
};

//  Gets a Single ProdSub by its id
exports.getPaymentById = (req, res, next) => {
	const paymentId = req.params.paymentId;
	Product_Payment.findByPk({
        where: {
           paymentId: paymentId
        },
        include: [
            {
				model: ProductSubscription,
				all: true,
				attributes: { exclude: ["paymentId", "createdAt", "updatedAt", "paymentValue","authorised"] },
				include: [
					{
						model: Savings_Products,
						all: true,
						attributes: { exclude: ["productId", "createdAt", "updatedAt", "moneyValue", "productDuration"] },
					},
					{
						model: Customer,
						all: true,
						attributes: { exclude: ["customerId", "createdAt", "updatedAt", "registrationDate", "email", "accountNo", "entryDate", "status", "gender", "phoneNo"] },
					}
				]
			}
		]
    })
		.then(payment => {
			if (!payment) {
				const error = new Error("Payment not found");
				error.statusCode = 404;
				next(error);
			} else {
				res.json(payment);
			}
		})
		.catch(err => next(err));
};

//Get created products and customers and then create Payment 
exports.postPayment = (req, res, next) => {
	const {prodSubId, paymentValue, paymentDate, authorised} = req.body;
	if (!authorised || !paymentDate || !paymentValue) {
		res.status(400).json({ msg: 'All field required' });
	} else {
		ProductSubscription.findOne({
			where: {
				prodSubId
			}
		}).then(prodSub => {
			if (!prodSub) {
				res.status(404).json({ success: false, msg: "Subscription not Found" })
			} else {
				Product_Payment.create({
					prodSubId,
					authorised,
					paymentDate,
					paymentValue
				})
					.then((prodSub => {
						res.json(prodSub)
					}))
					.catch((err) => res.status(400).send({
						msg: "something went wrong",
						Error: err
					}));
			}
		})

	}
}
// Edit Payment
// exports.postUpdateProduct = (req, res, next) => {
// 	const { signUpDate, customerId, productId } = req.body;
// 	const prodSubId = req.params.prodSubId;
// 	ProductSubscription.findByPk(prodSubId)
// 		.then((prodSub) => {
// 			prodSub.update({
// 				signUpDate,
// 				customerId,
// 				productId
// 			})
// 				.then(prodSub => {
// 					res.json(prodSub);
// 				}).catch((err) => next(err))

// 		})
// 		.catch(err =>
// 			res
// 				.status(500)
// 				.json({ msg: "Subscription does not exist", error: err })
// 		);
// };
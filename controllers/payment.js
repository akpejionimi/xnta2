const sequelize = require("sequelize");

const { 
	Customer, 
	ProductSubscription,
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
				attributes: { exclude: ["paymentId", "createdAt", "updatedAt", "paymentValue", "authorised"] },
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
	const customerId = req.params.customerId;
	Product_Payment.findAll({
		where: {
			customerId
		},
		include: [
			{
				model: ProductSubscription,
				all: true,
				attributes: { exclude: ["paymentId", "createdAt", "updatedAt",, "authorised"] },
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
		.then(customer => {
			if (!customer) {
				const error = new Error("Payment not found");
				error.statusCode = 404;
				next(error);
			} else {
				res.json(customer);
			}
		})
		.catch(err => next(err));
};

//Get created products and customers and then create Payment 
exports.postPayment = (req, res, next) => {
	const { paymentValue, authorised, paymentDate, prodSubId } = req.body;
	const customerId = req.params.customerId;
	if (!paymentValue, !paymentDate) {
		res.status(400).json({ msg: 'All field required' });
	} else {
		ProductSubscription.findByPk(customerId)
			.then(() => {
				Product_Payment.create({
					customerId,
					prodSubId,
					paymentValue,
					authorised,
					paymentDate
				})
					.then((customer => {
						res.json(customer)
					}))
			})
			.catch((err) => res.status(400).send({
				msg: "something went wrong",
				Error: err
			}));
	}
}


exports.getSumPaymentById = (req, res, next) => {
	const prodSubId = req.params.prodSubId;
	const customerId = req.params.customerId;
	Product_Payment.findAll({
		where: {
			customerId: customerId,
			prodSubId: 2,
		},
		attributes: [[sequelize.fn('sum', sequelize.col('paymentValue')), 'paymentValue']],
		// group : ['product_payment.prodSubId'],
		raw: true,
		// order: sequelize.literal('total DESC')
	})
}
//   .then(function () {
	//     return Product_Payment.findAll({where: {prodSubId: 1}});
	// })
	
	// exports.postPayment = (req, res, next) => {
	// 	const { paymentValue } = req.body;
	// 	const prodSubId = req.params.prodSubId;
	// 	Product_Payment.findByPk(prodSubId)
	// 		.then(() => {
	// 			Product_Payment.create({
	// 				prodSubId,
	// 				paymentValue,
	// 			})
	// 				.then(payment => {
	// 					res.json(payment);
	// 				}).catch((err) => next(err))
	
	// 		})
	// 		.catch(err =>
	// 			res
	// 				.status(500)
	// 				.json({ msg: "Payment error", error: err })
	// 		);
	// };
	
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
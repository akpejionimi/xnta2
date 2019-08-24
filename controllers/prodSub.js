const { Customer, ProductSubscription, Savings_Products } = require("../models/operatorModel")

//Get all Subscriptions

exports.getAllProdSubs = (req, res, next) => {
	ProductSubscription.findAll({
		include: [
			{
				all: true,
				attributes: { exclude: ["createdAt", "updatedAt"] }
			}
		]
	})
		.then(prodSubs => {
			res.json(prodSubs);
		})
		.catch(err => next(err));
};

exports.getAllProdSubs = (req, res, next) => {
	ProductSubscription.findAll({
		
	})
		.then(prodSubs => {
			res.json(prodSubs);
		})
		.catch(err => next(err));
};
/**
 * Gets a Single ProdSub by its id
 */
exports.getProSubById = (req, res) => {
	const prodSubId = req.params.prodSubId;
	ProductSubscription.findByPk(prodSubId)
		.then(prodSub => {
			if (!prodSub) {
				const error = new Error("Subscription not found");
				error.statusCode = 404;
				next(error);
			} else {
				res.json(prodSub);
			}
		})
		.catch(err => next(err));
};

//Get created products and customers and then create Subscription 
exports.postProdSub = (req, res, next) => {
	// const customerId = req.params.id;
	const { signUpDate, customerId, productId } = req.body;
	if (!signUpDate) {
		res.status(400).json({ msg: 'Date required' });
	} else {
		Customer.findOne({
			where: {
				customerId
			}
		}).then(customer => {
			if (!customer) {
				res.status(404).json({ success: false, msg: "customer not Found" })
			} else {
				Savings_Products.findOne({
					where: {
						productId: productId
					}
				}).then(savingsProduct => {
					if (!savingsProduct) {
						res.status(404).json({ success: false, msg: "product not Found" })
					} else {
						ProductSubscription.create({
							signUpDate,
							customerId,
							productId
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
		})
	}
}

// Edit product
exports.postUpdateProduct = (req, res, next) => {
	const { signUpDate, customerId, productId } = req.body;
	const prodSubId = req.params.prodSubId;
	ProductSubscription.findByPk(prodSubId)
		.then((prodSub) => {
			prodSub.update({
				signUpDate,
				customerId,
				productId
			})
				.then(prodSub => {
					res.json(prodSub);
				}).catch((err) => next(err))

		})
		.catch(err =>
			res
				.status(500)
				.json({ msg: "Subscription does not exist", error: err })
		);
};